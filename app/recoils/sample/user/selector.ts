import { selector } from 'recoil';
import { userState } from './atom';

export const userTagText = selector({
  key: 'userTagText',
  get: ({ get }) => {
    const { tagList } = get(userState);
    return '#' + tagList.join(' #');
  },
});
