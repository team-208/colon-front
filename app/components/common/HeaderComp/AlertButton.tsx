'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import icon_bell from '@/app/assets/images/header/icon_bell.png';
import DropDown from '../DropDown';
import ScrollContainer from '../ScrollContainer';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {}

interface IconListProps {
  isRead: boolean;
  iconUrl: string;
  titleComponent: JSX.Element;
  content: string;
}

const ContainerDiv = styled.div`
  position: relative;
  width: max-content;
  height: max-content;
`;

const Button = styled.button<{ $isAlert: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;

  ${({ theme, $isAlert }) =>
    $isAlert &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 4px;
        height: 4px;
        background: ${theme.color.status.destructive};
        border-radius: 50%;
      }
    `}
`;

const DropDownUl = styled.ul`
  padding: 8px 0;
`;

const DropDownHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 320px;
  padding: 6px 20px;

  p {
    ${({ theme }) => theme.font.body3}
    font-weight: 700;
  }

  button {
    ${({ theme }) => theme.font.caption2}
    color: ${({ theme }) => theme.color.primary.normal};
  }
`;

const IconListLi = styled.li<{ $isActive: boolean }>`
  width: 320px;
  height: auto;
  padding: 12px 20px;

  > p {
    width: 100%;

    &:first-of-type {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      ${({ theme }) => theme.font.body3}

      span {
        font-weight: 700;
      }
    }

    &:last-of-type {
      ${({ theme }) => theme.font.caption1}
      color: ${({ theme }) => theme.color.label.alternative};
      padding-left: 20px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const IconList = React.memo(({ isRead, iconUrl, titleComponent, content }: IconListProps) => {
  return (
    <IconListLi $isActive={isRead}>
      <p>
        <Image alt={'알림창 리스트 아이콘'} src={iconUrl} width={16} height={16} />
        {titleComponent}
      </p>
      <p>{content}</p>
    </IconListLi>
  );
});

const AlertButton = () => {
  const [isClick, setIsClick] = useState(false);

  const handleClickButton = () => {
    setIsClick((v) => !v);
  };

  return (
    <ContainerDiv>
      <Button onClick={handleClickButton} $isAlert={true}>
        <Image alt="알림 아이콘" src={icon_bell} width={24} height={24} />
      </Button>
      <DropDown isActive={isClick} direction={'right'} distance={{ desktop: 4, mobile: 4 }}>
        <DropDownUl>
          <DropDownHeader>
            <p>읽지 않은 알림 (10)</p>
            <button>모두 읽음</button>
          </DropDownHeader>
          <ScrollContainer>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((v, idx) => (
              <IconList
                key={idx}
                isRead={true}
                iconUrl={`${IMAGE_CDN}/qna/EmojiComment.png`}
                titleComponent={
                  <>
                    <span>김콜론</span>님이 답변을 달았어요.
                  </>
                }
                content="일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십"
              />
            ))}
          </ScrollContainer>
        </DropDownUl>
      </DropDown>
    </ContainerDiv>
  );
};

export default AlertButton;
export type AlertButtonType = { AlertButton: typeof AlertButton };
