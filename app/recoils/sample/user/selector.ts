import { selector } from 'recoil';
import { userState } from './atom';
import { RECOIL_KEYS } from '../key.d';

export const userTagText = selector({
  key: RECOIL_KEYS.userTagText,
  get: ({ get }) => {
    const { tagList } = get(userState);
    return '#' + tagList.join(' #');
  },
});
