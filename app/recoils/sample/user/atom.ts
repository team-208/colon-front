import { atom } from 'recoil';

// atom 생성
export const userState = atom({
  key: 'userState',
  default: {
    id: 14032,
    name: '홍길동',
    username: '슈퍼맨',
    tagList: ['프론트엔드', 'ReactJS', 'NextJS', 'Javascript', 'HTML', 'CSS'],
  },
});
