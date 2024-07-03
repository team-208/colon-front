'use client';

import { useCallback } from 'react';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import useModal from '@/app/hooks/useModal';
import { useRecoilValue } from 'recoil';
import { scrollState } from '@/app/recoils';
import ButtonComp from '../../common/ButtomComp';
import ModalComp from '../../common/ModalComp';

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  margin-top: 12px;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 28px;
  }
`;

const TextBoxDiv = styled.div`
  flex: auto;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 12px;
  padding: 12px 20px;
`;

const DescP1 = styled.p`
  ${({ theme }) => theme.font.body1}
  color: ${({ theme }) => theme.color.label.normal};
`;

const DescP2 = styled.p`
  ${({ theme }) => theme.font.body2}
  color: ${({ theme }) => theme.color.label.normal};
`;

const FloatingButton = styled(ButtonComp.Gradient)<{ $isScroll: boolean }>`
  ${({ theme }) => theme.font.body1}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 50px;
  padding: 0;
  margin-left: 24px;
  z-index: 2;

  span {
    margin-right: 8px;
  }

  ${({ $isScroll }) =>
    $isScroll &&
    css`
      width: 170px;
      position: fixed;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      margin-left: 0;
    `}

  ${({ theme }) => theme.mediaQuery.mobile} {
    position: fixed;
    bottom: 52px;
    right: 20px;
    left: auto;
    transform: none;

    width: 56px;
    height: 56px;
    border-radius: 50%;

    span {
      display: none;
    }
  }
`;

const FloatingBackgroundDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 1100px;
  height: 100px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) -91%, rgba(255, 255, 255, 0.9) 61.8%);
  z-index: 1;

  ${({ theme }) => theme.mediaQuery.mobile} {
    z-index: -1;
  }
`;

const ModalTextP = styled.p`
  ${({ theme }) => theme.font.body1};
  color: ${({ theme }) => theme.color.label.normal};

  span {
    color: ${({ theme }) => theme.color.primary.normal};
  }
`;

const TopArea = () => {
  const { userInfo } = useAuth();
  const { openModal, closeModal } = useModal();
  const scroll = useRecoilValue(scrollState);
  const { push } = useRouter();

  const handleClick = useCallback(() => {
    if (userInfo?.user) push('/qna/write');
    else
      openModal({
        modalProps: {
          contents: (
            <ModalComp.Confirm
              isReverseButton
              confirmLabel="회원가입 하러가기"
              cancelLabel="돌아가기"
              onConfirm={() => {
                push('/login');
                closeModal();
              }}
              onCancel={() => {
                closeModal();
              }}
            >
              <ModalTextP>
                <span>회원가입</span>하고
                <br />
                궁금증을 풀어보세요!
              </ModalTextP>
            </ModalComp.Confirm>
          ),
        },
      });
  }, [userInfo?.user]);

  return (
    <ContainerDiv>
      <TextBoxDiv>
        <DescP1>여러 직군에 있는 동료에게 물어보는 장소</DescP1>
        <DescP2>소통이 어려웠던 이유, 추가로 공부할 내용을 얻을 수 있어요.</DescP2>
      </TextBoxDiv>
      <FloatingButton isActive onClick={handleClick} $isScroll={scroll}>
        <span>질문하기</span>
        <Image alt="" src={`${IMAGE_CDN}/icon/Write.png`} width={20} height={20} />
      </FloatingButton>
      {scroll && <FloatingBackgroundDiv />}
    </ContainerDiv>
  );
};

export default TopArea;
