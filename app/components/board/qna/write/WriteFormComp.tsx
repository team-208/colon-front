'use client';

import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { Post } from '@/app/types/data';
import { UnprivilegedEditor } from 'react-quill';
import styled from 'styled-components';
import { createTextFile } from '@/app/utils/text';
import JobGroupList, { JOB_GROUP_LIST_TYPES } from './JobGroupList';
import TagList from './TagList';
import ButtonComp from '@/app/components/common/ButtomComp';

const QuillEditor = dynamic(() => import('@/app/components/common/QuillEditor'), { ssr: false });

interface Props {
  defaultPost?: Post;
}

const ContainerDiv = styled.div`
  padding: 0px 200px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0px 20px;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  ${({ theme }) => theme.font.body1}
  color: ${({ theme }) => theme.color.label.normal};
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.line.solid.normal};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.interaction.inactive};
  }
  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body2}
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

export const WriteComp = (props: Props) => {
  const { defaultPost } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef({ html: '', text: '' });

  const [major, setMajor] = useState<JOB_GROUP_LIST_TYPES>();

  const handleClickSave = (isTemporary: boolean) => {
    // content text .txt 파일로 변환 storage 저장
    // directory, file 명 논의하기
    const file = createTextFile(contentRef.current.html, 'userid_date');

    const obj = {
      title: 'title',
      content: 'storage_file_url',
      temporary: isTemporary,
    };

    // obj 객체 posts DB 저장
  };

  const setEditor = (editor: UnprivilegedEditor) => {
    contentRef.current.html = editor.getHTML();
    contentRef.current.text = editor.getText().replaceAll('\n', ' ');
  };

  return (
    <ContainerDiv>
      <JobGroupList jobGroup={major} onClick={(v) => setMajor(v)} />
      <TitleInput
        ref={titleRef}
        placeholder="글 제목은 질문 키워드를 넣어주시면 좋아요!"
        defaultValue={defaultPost?.title}
      />
      {/* <QuillEditor setEditor={setEditor} initValue="<p>안녕하세요</p>" /> */}
      <QuillEditor setEditor={setEditor} />
      <TagList />
      <ButtonLayoutDiv>
        <ButtonComp.Solid
          text="질문하기"
          size="lg"
          onClick={() => handleClickSave(false)}
          isActive
        />
        <ButtonComp.OutlinedPrimary
          text="임시저장"
          size="lg"
          onClick={() => handleClickSave(true)}
          isActive
        />
      </ButtonLayoutDiv>
    </ContainerDiv>
  );
};

export default WriteComp;
