import { atom } from 'recoil';
import { ModalRecoilStateProps } from '@/app/types/modalType';
import { RECOIL_KEYS } from '../key.d';

export const modalInitValue: ModalRecoilStateProps = {
  isOpen: false,
  contents: '',
  confirmLabel: '확인',
  cancelLabel: '취소',
  onConfirm: () => {},
  onCancel: () => {},
};

export const modalState = atom({
  key: RECOIL_KEYS.modalState,
  default: modalInitValue,
});
