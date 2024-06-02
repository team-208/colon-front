import { atom } from 'recoil';
import { ModalRecoilStateProps } from '@/app/types/modalType';
import { RECOIL_KEYS } from '../key';

export const modalInitValue: ModalRecoilStateProps = {
  isOpen: false,
  title: '',
  contents: '',
};

export const modalState = atom({
  key: RECOIL_KEYS.modalState,
  default: modalInitValue,
});
