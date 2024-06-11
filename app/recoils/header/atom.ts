import { atom } from 'recoil';
import { RECOIL_KEYS } from '../key.d';

const myPageHeaderInitValue = {
  isModify: false,
  onConfirm: () => {},
  onCancel: () => {},
};

// /mypage 가 아니면 isModify false
export const myPageHeaderState = atom({
  key: RECOIL_KEYS.headerState,
  default: myPageHeaderInitValue,
  effects: [
    ({ setSelf, onSet }: any) => {
      onSet((newValue: any) => {
        if (!newValue) setSelf(myPageHeaderInitValue);
      });
    },
  ],
});
