'use client';

import React from 'react';
import styled from 'styled-components';

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
  margin-bottom: 12px;
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.body2};
  color: ${({ theme }) => theme.color.label.normal};
  margin-right: 18px;
`;

const TagInput = styled.input`
  flex-grow: 1;
  ${({ theme }) => theme.font.body3}
  border-bottom: 1px solid ${({ theme }) => theme.color.interaction.inactive} !important;
  border: none;
  outline: none;
  padding: 6px 8px;

  &::placeholder {
    color: ${({ theme }) => theme.color.interaction.inactive};
  }
`;

const AddButton = styled.button`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.interaction.inactive};
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

const TagList = () => {
  return (
    <ContainerDiv>
      <TagContainerDiv>
        <TitleP>태그</TitleP>
        <TagInput placeholder=", 표시로 구분할 수 있어요." />
        <AddButton>+</AddButton>
      </TagContainerDiv>
      <TagListContainerDiv>
        <TagListP>#태그</TagListP>
        <TagListP>#태그</TagListP>
        <TagListP>#태그</TagListP>
        <TagListP>#태그</TagListP>
        <TagListP>#태그</TagListP>
      </TagListContainerDiv>
    </ContainerDiv>
  );
};

export default TagList;
