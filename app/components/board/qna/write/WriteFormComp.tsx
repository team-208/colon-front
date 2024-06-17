'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { writeHeaderState } from '@/app/recoils';
import { useSetRecoilState } from 'recoil';
import { UnprivilegedEditor } from 'react-quill';
import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import useAuth from '@/app/hooks/useAuth';
import useModal from '@/app/hooks/useModal';
import useTooltip from '@/app/hooks/useTooltip';
import { useInsertPostMutation } from '@/app/api/post/mutations';
import { useModifyPostMutation } from '@/app/api/post/[id]/mutations';
import { GetPostResponse, UpdatePostRequest } from '@/app/api/post/[id]/type';
import { InsertPostRequest } from '@/app/api/post/type';
import JobGroupList from './JobGroupList';
import TempSaveModal from './TempSaveModal';
import TempSaveCompleteModal from './TempSaveCompleteModal';
import TagList from './TagList';
import ButtonComp from '@/app/components/common/ButtomComp';
import TooltipComp from '@/app/components/common/TooltipComp';
import { removeUndefinedValue } from '@/app/utils/converter';

const QuillEditor = dynamic(() => import('@/app/components/common/QuillEditor'), { ssr: false });

interface Props {
  defaultPost?: GetPostResponse;
}

type VAL_TYPE = 'major' | 'title' | 'content';

const ContainerDiv = styled.div`
  padding: 0px 200px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0px 20px;
  }
`;

const TitleInputDiv = styled.div`
  width: 100%;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.line.solid.normal};

  input {
    width: inherit;
    ${({ theme }) => theme.font.body1}
    color: ${({ theme }) => theme.color.label.normal};
    padding: 12px 16px;
    border-radius: inherit;
    border: none;
    outline: none;
    &::placeholder {
      color: ${({ theme }) => theme.color.interaction.inactive};
    }

    ${({ theme }) => theme.mediaQuery.mobile} {
      ${({ theme }) => theme.font.body2}
    }
  }
`;

const ButtonLayoutDiv = styled.div`
  width: 100%;

  > * {
    float: right;
  }

  :not(:first-of-type) {
    margin-right: 12px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    position: fixed;
    bottom: 52px;
    right: 20px;
  }
`;

const ErrorDiv = styled.div<{ $isError: boolean }>`
  ${({ theme, $isError }) =>
    $isError &&
    css`
      > * {
        border-color: ${theme.color.status.destructive} !important;
      }
    `}
`;

export const WriteFormComp = (props: Props) => {
  const { defaultPost } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef({ html: '', text: '' });
  const pendingRef = useRef(false);

  const [major, setMajor] = useState<JOB_GROUP_TYPES | undefined>(defaultPost?.requested_major);
  const [val, setVal] = useState<{ isCheck: boolean; list: string[] }>({
    isCheck: false,
    list: [],
  });

  const setHeader = useSetRecoilState(writeHeaderState);

  const { openModal, closeModal } = useModal();
  const { visibleTooltip } = useTooltip();
  const { userInfo } = useAuth();
  const { mutateAsync: postMutation } = useInsertPostMutation();
  const { mutateAsync: modifyPostMutation } = useModifyPostMutation();
  const { push, replace } = useRouter();

  const handleClickSave = async (isTemporary: boolean, callback: (id: number) => void) => {
    if (pendingRef.current) return;

    // TODO: 로그인한 유저가 아니라면 접근 자체를 막기 - 작성페이지 단에서 처리
    if (isEmpty(userInfo)) return;
    if (validate()) return;

    pendingRef.current = true;

    if (defaultPost) {
      const { id, requested_major, title, body, preview_body, created_at } = defaultPost;

      const post: UpdatePostRequest = {
        id,
        status: isTemporary ? 'EDITING' : 'COMPLETE',
        requested_major: requested_major !== major ? major : undefined,
        title: title !== titleRef.current?.value ? titleRef.current?.value : undefined,
        body: body !== contentRef.current.html ? { data: contentRef.current.html, created_at } : undefined,
        preview_body: preview_body !== contentRef.current.text ? contentRef.current.text : undefined,
      };

      await modifyPostMutation(removeUndefinedValue(post) as UpdatePostRequest);
      callback(id);
    } else {
      const post: InsertPostRequest = {
        status: isTemporary ? 'EDITING' : 'COMPLETE',
        requested_major: major as JOB_GROUP_TYPES,
        title: titleRef.current?.value ?? '',
        body: contentRef.current.html,
        preview_body: contentRef.current.text,
        author_major: userInfo?.user.major as JOB_GROUP_TYPES,
        author_nickname: userInfo?.user.nick_name,
        author_profile_url: userInfo?.user.profile_url,
        // tags: [],
      };

      const { postId } = await postMutation(post);
      callback(postId);
    }

    pendingRef.current = false;
  };

  const validate = (): boolean => {
    const title = titleRef.current?.value.trim() ?? '';
    const content = contentRef.current.text.trim();

    const valList: VAL_TYPE[] = [];

    if (!major) valList.push('major');
    if (title.length < 10) valList.push('title');
    if (content.length < 30) valList.push('content');

    if (valList.indexOf('major') > -1) {
      openTooltip('질문할 직군을 선택해주세요.');
    } else if (valList.indexOf('content') > -1) {
      openTooltip('더 구체적으로 작성해주세요!');
    }

    setVal({ isCheck: true, list: valList });

    return valList.length > 0 ? true : false;
  };

  const errorCheck = (str: VAL_TYPE): boolean => {
    return val.isCheck && val.list.includes(str);
  };

  const setEditor = useCallback((editor: UnprivilegedEditor) => {
    contentRef.current.html = editor.getHTML();
    contentRef.current.text = editor.getText().replaceAll('\n', ' ');
  }, []);

  const oepnTempSaveCompleteModal = useCallback((postId: number) => {
    openModal({
      modalProps: {
        contents: (
          <TempSaveCompleteModal
            onConfirm={() => {
              closeModal();
              replace(`/qna/${postId}/modify`);
            }}
            onCancel={() => {
              closeModal();

              // TODO: 활동내역(임시저장) 탭 보이도록 추후 처리
              replace(`/mypage`);
            }}
          />
        ),
      },
    });
  }, []);

  const openTempSaveModal = useCallback(() => {
    openModal({
      modalProps: {
        contents: (
          <TempSaveModal
            onConfirm={() => {
              handleClickSave(true, (id) => {
                oepnTempSaveCompleteModal(id);
              });
              closeModal();
            }}
            onCancel={() => {
              closeModal();
              push('/qna');
            }}
          />
        ),
      },
    });
  }, [oepnTempSaveCompleteModal, handleClickSave]);

  const openTooltip = useCallback((text: string) => {
    visibleTooltip({
      tooltipProps: {
        contents: <TooltipComp.Basic position="center" text={text} />,
      },
    });
  }, []);

  useEffect(() => {
    setHeader({
      onCancel: openTempSaveModal,
    });

    return () => {
      setHeader({
        onCancel: () => {},
      });
    };
  }, [openTempSaveModal]);

  return (
    <ContainerDiv>
      <JobGroupList
        jobGroup={major}
        onClick={(v) => {
          setMajor(v);
        }}
      />
      <ErrorDiv $isError={errorCheck('title')}>
        <TitleInputDiv>
          <input
            ref={titleRef}
            placeholder="글 제목은 질문 키워드를 넣어주시면 좋아요!"
            defaultValue={defaultPost?.title}
          />
        </TitleInputDiv>
      </ErrorDiv>
      <ErrorDiv $isError={errorCheck('content')}>
        <QuillEditor setEditor={setEditor} initValue={defaultPost?.body} />
      </ErrorDiv>
      <TagList />
      <ButtonLayoutDiv>
        <ButtonComp.Solid
          text="질문하기"
          size="lg"
          onClick={() =>
            handleClickSave(false, (id) => {
              replace(`/qna/${id}`);
            })
          }
          isActive
        />
        <ButtonComp.OutlinedPrimary
          text="임시저장"
          size="lg"
          onClick={() =>
            handleClickSave(true, (id) => {
              oepnTempSaveCompleteModal(id);
            })
          }
          isActive
        />
      </ButtonLayoutDiv>
    </ContainerDiv>
  );
};

export default WriteFormComp;
