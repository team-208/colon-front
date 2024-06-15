'use client';

import ModalComp from '@/app/components/common/ModalComp';
import styled from 'styled-components';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const BlueSpan = styled.span`
  color: ${({ theme }) => theme.color.primary.normal};
`;

const TempSaveModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <ModalComp.Confirm
      confirmLabel="임시저장하기"
      cancelLabel="작성 취소하기"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {`글 작성을 취소하시면\n질문하신 `}
      <BlueSpan>{`내용, 태그 등 관련 정보`}</BlueSpan>
      {`가 사라져요!\n임시저장하시는 건 어떠신가요?`}
    </ModalComp.Confirm>
  );
};

export default TempSaveModal;
