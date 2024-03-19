'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { cutText } from '@/app/utils/text';

type Props = {
  date: Date;
  title: string;
  content: string;
  nickname: string;
  modified: boolean;
  solved: boolean;
  isModify?: boolean;
  children?: ReactNode;
};

const PostContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostDiv = styled.div`
  position: relative;
  width: 100%;
  padding: 12px;
  background: #d9d9d9;
  border-radius: 8px;
`;

const PostTitleP = styled.p`
  font-size: 25px;
  font-weight: bold;
`;
const PostTitleSpan = styled.span`
  font-size: 15px;
  font-weight: 400 !important;
`;

const PostContentP = styled.p`
  font-size: 20px;
  margin: 12px 0;
`;

const PostNicknameP = styled.p`
  font-size: 20px;
`;

const PostButtonLaytoutDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  > *:not(:last-child) {
    margin-right: 4px;
  }
`;

const PostButton = styled.button`
  display: inline-block;
  padding: 8px;
  font-size: 20px;
  background: transparent;
`;

export default function Post(props: Props) {
  const { date, title, content, nickname, modified, solved, isModify, children } = props;

  return (
    <PostContainerDiv>
      {children}

      <PostDiv>
        <PostTitleP>
          {solved ? '✅ ' : '🖐️ '}
          {cutText(title, 75, '...')}
          <PostTitleSpan>
            {/* TODO: 라이브러리 상의하기 dayjs */}
            {date.getMonth() + '.' + date.getDate()}
            {modified && '(편집됨)'}
          </PostTitleSpan>
        </PostTitleP>

        {/* TODO: content 줄바꿈 => 띄어쓰기 및 75자 제한 생각할것 */}
        <PostContentP>{content}</PostContentP>

        <PostNicknameP>{nickname}</PostNicknameP>

        {isModify && (
          <PostButtonLaytoutDiv>
            <PostButton>수정</PostButton>
            <PostButton>삭제</PostButton>
          </PostButtonLaytoutDiv>
        )}
      </PostDiv>
    </PostContainerDiv>
  );
}
