import { atom } from 'recoil';
import { RECOIL_KEYS } from '../key.d';

const myPageHeaderInitValue = {
  isModify: false,
  onConfirm: () => {},
  onCancel: () => {},
};

export const myPageHeaderState = atom({
  key: RECOIL_KEYS.mypageHeaderState,
  default: myPageHeaderInitValue,
  effects: [
    ({ setSelf, onSet }: any) => {
      onSet((newValue: any) => {
        if (!newValue) setSelf(myPageHeaderInitValue);
      });
    },
  ],
});

export const writeHeaderState = atom({
  key: RECOIL_KEYS.writeHeaderState,
  default: {
    onCancel: () => {},
  },
});
