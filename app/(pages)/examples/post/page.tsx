'use client';

import useHistoryQuery from '@/app/api/auth/history/queries';
import usePostQuery from '@/app/api/post/[id]/queries';
import { useInsertPostMutation } from '@/app/api/post/mutations';
import usePostListQuery from '@/app/api/post/queries';
import { useInsertPostScrapMutation } from '@/app/api/post/scrap/mutations';
import usePostScrapQuery from '@/app/api/post/scrap/queries';
import { useModifyPostMutation } from '@/app/api/post/[id]/mutations';

export default function PostPage() {
  const { data } = usePostQuery('7');
  const { mutateAsync } = useInsertPostMutation();
  const { mutateAsync: postScrapMutation } = useInsertPostScrapMutation();
  const { mutateAsync: postModifyMutation } = useModifyPostMutation();
  const { fetchNextPage, hasNextPage } = usePostListQuery({ order: 'DATE_DESC', major: 'ALL' });

  const { data: test } = useHistoryQuery({ historyType: 'ACTIVITY' });

  const { data: scrapData } = usePostScrapQuery();

  const handleClick = async () => {
    await mutateAsync({
      status: 'EDITING',
      requested_major: 'DEVELOP',
      title: '개발테스트',
      tags: ['태그1', '태그2'],
      author_major: 'DEVELOP',
      author_nickname: '개발테스트1114',
      body: '개발테스트!!!!!!!!!!!!',
      author_profile_url: '',
      preview_body: '개발테스트 개발테스트 개발테스트 개발테스트',
    });
  };

  const handleClickList = async () => {
    if (hasNextPage) {
      console.log(await fetchNextPage());
    }
  };

  const handleClickScrap = async () => {
    postScrapMutation({ postId: 7 });
  };

  const handleClickUpdate = async () => {
    postModifyMutation({
      id: 33,
      title: '타이틀 변경',
    });
  };

  return (
    <main>
      <p>post title : {data?.title}</p>
      <p>post status : {data?.status}</p>
      <p>post requested_major : {data?.requested_major}</p>
      <p>post author_nickname : {data?.author_nickname}</p>
      <p>post author_major : {data?.author_major}</p>
      <br />
      <button onClick={handleClick}>post 추가</button>
      <button onClick={handleClickList}>다음 post list 조회</button>
      <button onClick={handleClickScrap}>7 post scrap</button>
      <button onClick={handleClickUpdate}>33 post title update</button>
    </main>
  );
}
