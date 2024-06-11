import React from 'react';

import ModalComp from '@/app/components/common/ModalComp';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const TempSaveCompleteModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <ModalComp.Confirm
      confirmLabel="글 작성 계속하기"
      cancelLabel="보러가기"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      임시저장이 완료되었어요!
    </ModalComp.Confirm>
  );
};

export default TempSaveCompleteModal;
