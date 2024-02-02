import { atom } from 'recoil';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

// atom 생성
export const userState = atom({
  key: 'userState',
  default: {
    id: 14032,
    name: '홍길동',
    username: '슈퍼맨',
    tagList: ['프론트엔드', 'ReactJS', 'NextJS', 'Javascript', 'HTML', 'CSS'],
  },
  effects: [localStorageEffect('user_info')],
});
