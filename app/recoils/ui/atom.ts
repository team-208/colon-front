import { atom } from 'recoil';
import { RECOIL_KEYS } from '../key.d';

// atom 생성
export const scrollState = atom({
  key: RECOIL_KEYS.scrollState,
  default: false,
});
