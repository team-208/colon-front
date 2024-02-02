import { atom } from 'recoil';

interface Storage {
  Session: 'session';
  Local: 'local';
}

const storageEffect =
  (type: Storage[keyof Storage], key: string) =>
  ({ setSelf, onSet }: any) => {
    if (typeof window === 'undefined') return;

    const savedValue = window[`${type}Storage`].getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? window[`${type}Storage`].removeItem(key)
        : window[`${type}Storage`].setItem(key, JSON.stringify(newValue));
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
  effects: [storageEffect('session', 'user_info')],
});
