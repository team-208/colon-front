import { atom } from 'recoil';
import { RECOIL_KEYS } from '../key.d';

// atom 생성
export const scrollState = atom({
  key: RECOIL_KEYS.scrollState,
  default: true, // callback 함수 최초 1회 실행 떄문에 true 값
});

export const mobileScreenState = atom({
  key: RECOIL_KEYS.mobileScreenState,
  default: true,
});