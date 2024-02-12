import { atom } from 'recoil';
import { storageEffect } from '../effects';
import { RECOIL_KEYS, RECOIL_STORAGE_KEYS } from '../key.d';

// atom 생성
export const userState = atom({
  key: RECOIL_KEYS.userState,
  default: {
    id: 14032,
    name: '홍길동',
    username: '슈퍼맨',
    tagList: ['프론트엔드', 'ReactJS', 'NextJS', 'Javascript', 'HTML', 'CSS'],
  },
  effects: [storageEffect('session', RECOIL_STORAGE_KEYS.userInfo)],
});
