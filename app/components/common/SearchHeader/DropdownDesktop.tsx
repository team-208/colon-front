'use client';

import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import DropDown from '../DropDown';
import Divider from '../DividerComp';
import { PostSearchItemProps } from '@/app/api/post/search/type';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  isActive: boolean;
  word: string;
  posts: PostSearchItemProps[] | undefined;
  comments: PostSearchItemProps[] | undefined;
}

const DropDownWidthFull = styled(DropDown)`
  width: 100%;

  ${({ theme }) => theme.mediaQuery.mobile} {
    display: none;
  }
`;

const DropDownInnerDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 24px 20px;
`;

const MarginDivider = styled(Divider.Horizonal)`
  margin: 16px 0;
`;

const MarginUl = styled.ul<{ $margin: number }>`
  > li {
    cursor: pointer;
  }

  > li:not(:last-of-type) {
    margin-bottom: ${({ $margin }) => $margin}px;
  }
`;

const ListTitleP = styled.p`
  ${({ theme }) => theme.font.heading2}
  margin-bottom: 16px;
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: row;

  img {
    margin-right: 12px;
  }

  p {
    ${({ theme }) => theme.font.body1}
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;

const CommentDiv = styled.div`
  display: flex;
  flex-direction: row;

  img {
    margin: 0 12px;
  }

  p {
    ${({ theme }) => theme.font.body2}
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;

const DropDownFooterDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
`;

const MoreButton = styled.button`
  width: 160px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  p {
    ${({ theme }) => theme.font.body1}
    color: ${({ theme }) => theme.color.primary.normal};
    margin-right: 10px;
  }

  &:hover {
    /* theme.color.primary.normal */
    background-color: rgba(0, 161, 255, 0.04);
  }
`;

const DropdownDesktop = ({ word, isActive, posts, comments }: Props) => {
  const { push } = useRouter();

  const postResult = useMemo(() => posts && posts.length > 0, [posts]);
  const commentsResult = useMemo(() => comments && comments.length > 0, [comments]);

  const handleMoreButton = useCallback(() => {
    push(`/qna/search?word=${word}`);
  }, [word]);

  const handlePostClick = useCallback((id: string) => {
    push(`/qna/${id}`);
  }, []);

  return (
    <DropDownWidthFull isActive={isActive} defaultHeight={112}>
      <DropDownInnerDiv>
        {word && (
          <>
            <ListTitleP>질문</ListTitleP>
            <MarginUl $margin={8}>
              {word &&
                (postResult ? (
                  posts?.map((post) => (
                    <li
                      key={`post-${post.id}`}
                      onClick={() => {
                        handlePostClick(post.id);
                      }}
                    >
                      <PostDiv>
                        <Image
                          alt=""
                          src={`${IMAGE_CDN}/qna/CheckMarkButton_disable.png`}
                          width={20}
                          height={20}
                        />
                        <p>{post.text}</p>
                      </PostDiv>
                    </li>
                  ))
                ) : (
                  <div>결과 없음</div>
                ))}
            </MarginUl>
            <MarginDivider height={1} />
            <ListTitleP>답변</ListTitleP>
            <MarginUl $margin={16}>
              {word &&
                (postResult ? (
                  comments?.map((comment) => (
                    <li key={`comment-${comment.id}`}>
                      <PostDiv>
                        <Image
                          alt=""
                          src={`${IMAGE_CDN}/qna/CheckMarkButton_disable.png`}
                          width={20}
                          height={20}
                        />
                        <p>{comment.text}</p>
                      </PostDiv>
                      <CommentDiv>
                        <Image
                          alt=""
                          src={`${IMAGE_CDN}/icon/Icon_Reply_gray.png`}
                          width={20}
                          height={20}
                        />
                        <p>{comment.text}</p>
                      </CommentDiv>
                    </li>
                  ))
                ) : (
                  <div>결과 없음</div>
                ))}
            </MarginUl>
            <DropDownFooterDiv>
              <MoreButton onClick={handleMoreButton}>
                <p>더 찾아보기</p>
                <Image
                  alt="다음 아이콘"
                  src={`${IMAGE_CDN}/icon/Arrow_Right_Blue.png`}
                  width={24}
                  height={24}
                />
              </MoreButton>
            </DropDownFooterDiv>
          </>
        )}
      </DropDownInnerDiv>
    </DropDownWidthFull>
  );
};

export default DropdownDesktop;
