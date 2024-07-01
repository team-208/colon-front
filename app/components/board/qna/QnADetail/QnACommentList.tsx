'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import { useModifyPostMutation } from '@/app/api/post/[id]/mutations';
import ButtonComp from '@/app/components/common/ButtomComp';
import CommentComp from '@/app/components/common/CommentComp';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import useAuth from '@/app/hooks/useAuth';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  postId: string;
  acceptedCommentId: number;
  postAuthor: string;
}

const ConatinerDiv = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const FilterDiv = styled.div`
  margin: 12px 0 6px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.body2};
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 4px 8px;
  ${({ theme }) => theme.font.body3};

  & > span {
    margin-right: 4px;
  }
`;

const CommentP = styled.p`
  ${({ theme }) => theme.font.body2};
  font-weight: 400;
  color: ${({ theme }) => theme.color.label.normal};
  margin: 6px 0 10px;
`;

const commentList = [
  {
    id: 1,
    major: 'DEVELOP',
    nickname: '사용자 닉네임',
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    comment:
      '개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~',
    isNestedComment: false,
    isSelected: true,
  },
  {
    id: 2,
    major: 'DEVELOP',
    nickname: '사용자 닉네임',
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    comment:
      '개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~',
    isNestedComment: true,
  },
  {
    id: 3,
    major: 'DEVELOP',
    nickname: '사용자 닉네임',
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    comment:
      '개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~',
    isNestedComment: false,
  },
];

const FooterBoxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChoiceButton = styled(ButtonComp.OutlinedPrimary)`
  padding: 4px 10px;
  height: 26px;
  border-radius: 8px;
  ${({ theme }) => theme.font.body3};
`;

const emojis = {
  thumbsUp: 2,
  smilingHeart: 4,
  heart: 0,
};

const QnACommentList = ({ postId, acceptedCommentId, postAuthor }: Props) => {
  const { data } = useCommentsQuery(postId);
  const { mutateAsync } = useModifyPostMutation();

  const { userInfo } = useAuth();
  const { refresh } = useRouter();

  const isAuthor = useMemo(() => postAuthor === userInfo?.user.nick_name, [userInfo]);

  const handleClickChoice = useCallback(async (commentId: number) => {
    await mutateAsync({ id: parseInt(postId), status: 'COMPLETE', accept_comment_id: commentId });
    refresh();
  }, []);

  return (
    <ConatinerDiv>
      <FilterDiv>
        <TitleP>댓글</TitleP>
        {/* TODO: selector 컴포넌트 제작 필요 */}
        <SelectButton>
          <span>정렬</span>
          <Image
            alt="정렬 아이콘"
            src={`${IMAGE_CDN}/icon/chevron-down.png`}
            width={8}
            height={4.5}
          />
        </SelectButton>
      </FilterDiv>

      <ul>
        {data?.map(
          ({
            id,
            author_nickname,
            created_at,
            updated_at,
            comment,
            original_comment,
            nestedComments,
            author_major,
          }) => {
            return (
              <React.Fragment key={`comment-item-${id}`}>
                <li>
                  <CommentComp.Wrapper isNestedComment={!!original_comment}>
                    <CommentComp.Header
                      major={author_major}
                      nickname={author_nickname}
                      updatedAt={updated_at || created_at}
                      isSelected={acceptedCommentId === id}
                    />
                    <CommentP>{comment}</CommentP>
                    <FooterBoxDiv>
                      <CommentComp.Emojis emojis={emojis} />
                      {isAuthor && !acceptedCommentId && (
                        <ChoiceButton isActive onClick={() => handleClickChoice(id)}>
                          글쓴이 채택
                        </ChoiceButton>
                      )}
                    </FooterBoxDiv>
                  </CommentComp.Wrapper>
                </li>
                {nestedComments?.map((item, idx) => {
                  const isAuthorComment = userInfo?.user.nick_name === item.author_nickname;
                  return (
                    <li key={`nested-comment-item-${item.id}`}>
                      <CommentComp.Wrapper isNestedComment={true}>
                        <CommentComp.Header
                          major={author_major}
                          nickname={item.author_nickname}
                          updatedAt={item.updated_at || item.created_at}
                          isSelected={acceptedCommentId === item.id}
                        />
                        <CommentP>{item.comment}</CommentP>
                        <FooterBoxDiv>
                          <CommentComp.Emojis emojis={emojis} />
                          {isAuthor && !isAuthorComment && !acceptedCommentId && (
                            <ChoiceButton isActive onClick={() => handleClickChoice(item.id)}>
                              글쓴이 채택
                            </ChoiceButton>
                          )}
                        </FooterBoxDiv>
                      </CommentComp.Wrapper>
                    </li>
                  );
                })}
              </React.Fragment>
            );
          },
        )}
      </ul>
    </ConatinerDiv>
  );
};

export default QnACommentList;
