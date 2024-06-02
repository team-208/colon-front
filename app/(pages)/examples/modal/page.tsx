'use client';

import useModal from '@/app/hooks/useModal';

export default function ModalPage() {
  const { openModal, closeModal } = useModal();

  const handleClick = async () => {
    openModal({
      contents: '모달!',
      cancelLabel: '취소',
      confirmLabel: '확인',
      onCancel: () => {
        closeModal();
      },
      onConfirm: () => {},
    });
  };

  return (
    <main>
      <button onClick={handleClick}>modal open</button>
    </main>
  );
}
