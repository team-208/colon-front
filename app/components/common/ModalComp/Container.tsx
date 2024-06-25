'use client';

import useModal from '@/app/hooks/useModal';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  position: absolute;
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

  const handleClick = () => {
    closeModal();
  }

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
