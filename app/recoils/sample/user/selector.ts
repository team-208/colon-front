import { selector, selectorFamily } from 'recoil';
import { userState } from './atom';

type response<T> = {
  status: number;
  data: T;
  message?: string;
};

export type QuestionList = Array<{ id: number; title: string; content: string }>;

const getQuestionList = (userID: number): Promise<response<QuestionList>> => {
  return new Promise<response<QuestionList>>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          { id: 1, title: 'React 상태관리 뭐 이용하시나요?', content: '...' },
          { id: 2, title: 'VueJS VS ReactJS', content: '...' },
        ],
      });
    }, 3000);

    // setTimeout(() => {
    //   reject();
    // }, 3000);
  });
};

export const userTagText = selector({
  key: 'userTagText',
  get: ({ get }) => {
    const { tagList } = get(userState);
    return '#' + tagList.join(' #');
  },
});

export const userQuestionList = selectorFamily({
  key: 'userQuestionList',
  get: (userID: number) => async () => {
    const { status, data, message } = await getQuestionList(userID);
    if (status === 200 && data) {
      return data;
    } else {
      return new Error(message);
    }
  },
});
