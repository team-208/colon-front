type SortMenuList = { id: number; text: string; value: number | string }[];

export const headerMenu = [{ id: 1, text: 'Q&A', route: '/qna' }];

export const sortMenuList: SortMenuList = [
  { id: 1, text: '최신순', value: 0 },
  { id: 2, text: '반응순', value: 1 },
  { id: 3, text: '답변순', value: 2 },
  { id: 4, text: '스크랩순', value: 3 },
];
