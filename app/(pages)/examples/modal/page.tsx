'use client';

import ModalComp from '@/app/components/common/ModalComp';
import useModal from '@/app/hooks/useModal';
import styled from 'styled-components';

const BlueSpan = styled.span`
  color: ${({ theme }) => theme.color.primary.normal};
`;

export default function ModalPage() {
  const { openModal, closeModal } = useModal();

  const handleClick = async () => {
    openModal({
      modalProps: {
        contents: (
          <ModalComp.Confirm
            confirmLabel="임시저장하기"
            cancelLabel="작성 취소하기"
            onConfirm={() => {
              closeModal();
            }}
            onCancel={() => {
              closeModal();
            }}
          >
            {`글 작성을 취소하시면\n질문하신 `}
            <BlueSpan>{`내용, 태그 등 관련 정보`}</BlueSpan>
            {`가 사라져요!\n임시저장하시는 건 어떠신가요?`}
          </ModalComp.Confirm>
        ),
        cancelLabel: '취소',
        confirmLabel: '확인',
        onCancel: () => {
          closeModal();
        },
        onConfirm: () => {},
      },
    });
  };

  return (
    <main>
      <button onClick={handleClick}>modal open</button>
    </main>
  );
}
