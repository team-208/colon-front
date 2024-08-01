'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import useModal from '@/app/hooks/useModal';
import useLockedBody from '@/app/hooks/useLockedBody';

const ContainerDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.color.static.dark}14;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 999;
`;

const Container = () => {
  const { modalState, closeModal } = useModal();
  const [isLock, setisLock] = useLockedBody();

  const handleClick = () => {
    closeModal();
  };

  useEffect(() => {
    if (modalState.isOpen) setisLock(true);
    else setisLock(false);
  }, [modalState.isOpen]);

  return (
    <>
      {modalState.isOpen && (
        <ContainerDiv onClick={handleClick}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {modalState.modalProps.contents}
          </div>
        </ContainerDiv>
      )}
    </>
  );
};

export default Container;
export type ContainerType = { Container: typeof Container };
