'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

const ContainerDiv = styled.div`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 64px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 0%;
  }
`;

const TagContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.body2};
  color: ${({ theme }) => theme.color.label.normal};
  margin-right: 18px;
`;

const TagInput = styled.input`
  width: 100%;
  ${({ theme }) => theme.font.body3}
  border-bottom: 1px solid ${({ theme }) => theme.color.interaction.inactive} !important;
  border: none;
  outline: none;
  padding: 6px 8px;

  &::placeholder {
    color: ${({ theme }) => theme.color.interaction.inactive};
  }
`;

const AddButton = styled.button<{ $isError: boolean }>`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: ${({ theme, $isError }) =>
    $isError ? theme.color.status.destructive : theme.color.interaction.inactive};
  color: #ffffff;
  font-size: 17px;
  line-height: 17px;
  padding: 0;
  margin-left: 8px;
`;

const TagListContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 44px;
`;

const TagListP = styled.p`
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.font.body3}
  color: ${({ theme }) => theme.color.primary.normal};
  background: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  border-radius: 8px;
  padding: 6px 8px;

  &:not(:last-of-type) {
    margin-right: 8px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.caption1}
  }
`;

const CloseButton = styled.button`
  margin-left: 4px;
`;

const ErrorDiv = styled.div<{ $isError: boolean }>`
  position: relative;
  flex-grow: 1;

  ${({ $isError, theme }) =>
    $isError &&
    css`
      > * {
        border-color: ${theme.color.status.destructive} !important;
      }
    `}
`;

const ErrorTextP = styled.p`
  position: absolute;
  ${({ theme }) => theme.font.caption2}
  color: ${({ theme }) => theme.color.status.destructive};
  font-weight: 400;
  margin-top: 2px;
`;

const TagList = () => {
  const [isError, setIsError] = useState(true);

  return (
    <ContainerDiv>
      <TagContainerDiv>
        <TitleP>태그</TitleP>
        <ErrorDiv $isError={isError}>
          <TagInput placeholder=", 표시로 구분할 수 있어요." />
          {isError && <ErrorTextP>공백없이 2자 이상 입력해주세요.</ErrorTextP>}
        </ErrorDiv>
        <AddButton $isError={isError}>+</AddButton>
      </TagContainerDiv>

      <TagListContainerDiv>
        <TagListP>
          # 태그
          <CloseButton>
            <Image
              alt="삭제 이미지"
              src={`${IMAGE_CDN}/icon/Icon_Close.svg`}
              width={14}
              height={14}
            />
          </CloseButton>
        </TagListP>
        <TagListP>
          # 태그
          <CloseButton>
            <Image
              alt="삭제 이미지"
              src={`${IMAGE_CDN}/icon/Icon_Close.svg`}
              width={14}
              height={14}
            />
          </CloseButton>
        </TagListP>
        <TagListP>
          # 태그
          <CloseButton>
            <Image
              alt="삭제 이미지"
              src={`${IMAGE_CDN}/icon/Icon_Close.svg`}
              width={14}
              height={14}
            />
          </CloseButton>
        </TagListP>
        <TagListP>
          # 태그
          <CloseButton>
            <Image
              alt="삭제 이미지"
              src={`${IMAGE_CDN}/icon/Icon_Close.svg`}
              width={14}
              height={14}
            />
          </CloseButton>
        </TagListP>
      </TagListContainerDiv>
    </ContainerDiv>
  );
};

export default TagList;
