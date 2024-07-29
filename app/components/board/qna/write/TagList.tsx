'use client';

import Image from 'next/image';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  list: string[];
  setList: Dispatch<SetStateAction<string[]>>;
}

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
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.interaction.inactive};
  outline: none;
  padding: 6px 8px;

  &::placeholder {
    color: ${({ theme }) => theme.color.interaction.inactive};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.primary.normal};
  }
`;

const AddButton = styled.button<{ $isActive: boolean; $isError: boolean }>`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: ${({ theme, $isActive, $isError }) =>
    ($isError && theme.color.status.destructive) ||
    ($isActive && theme.color.primary.normal) ||
    theme.color.interaction.inactive};
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

const TagList = ({ list, setList }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const validate = (str: string): boolean => {
    const pattern = '^[0-9|a-z|A-Z|가-힣|,]*$';
    const rgx = new RegExp(pattern);

    if (!rgx.test(str)) return false;

    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
      if (list[i].length < 2 || list[i].length > 10) return false;
    }

    return true;
  };

  const handleAddButtonClck = () => {
    if (!inputRef.current) return;

    const str = inputRef.current.value;
    const result = validate(str);

    setIsError(!result);

    if (result) {
      setList((prev) => [...prev, ...str.split(',')]);
      inputRef.current.value = '';
    }
  };

  const handleCloseButtonClick = (idx: number) => {
    const copyList = list.concat([]);
    copyList.splice(idx, 1);
    setList(copyList);
  };

  return (
    <ContainerDiv>
      <TagContainerDiv>
        <TitleP>태그</TitleP>
        <ErrorDiv $isError={isError}>
          <TagInput
            ref={inputRef}
            placeholder=", 표시로 구분할 수 있어요."
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
          {isError && <ErrorTextP>공백 없이 2자 이상 10자 이하로 입력해주세요</ErrorTextP>}
        </ErrorDiv>
        <AddButton $isActive={isActive} $isError={isError} onClick={handleAddButtonClck}>
          +
        </AddButton>
      </TagContainerDiv>

      <TagListContainerDiv>
        {list.map((str, idx) => (
          <TagListP key={`tag-${idx}`}>
            # {str}
            <CloseButton onClick={() => handleCloseButtonClick(idx)}>
              <Image
                alt="삭제 이미지"
                src={`${IMAGE_CDN}/icon/Icon_Close.svg`}
                width={14}
                height={14}
              />
            </CloseButton>
          </TagListP>
        ))}
      </TagListContainerDiv>
    </ContainerDiv>
  );
};

export default TagList;
