import { selector } from 'recoil';
import { userState } from '.';

export const userTagText = selector({
  key: 'userTagText',
  get: ({ get }) => {
    const { tagList } = get(userState);
    return '#' + tagList.join(' #');
  },
});
