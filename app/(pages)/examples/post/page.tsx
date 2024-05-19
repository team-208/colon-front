'use client';

import usePostQuery from '@/app/api/post/[id]/queries';
import { useInsertPostMutation } from '@/app/api/post/mutations';
import usePostListQuery from '@/app/api/post/queries';

export default function PostPage() {
  const { data } = usePostQuery('7');
  const { mutateAsync } = useInsertPostMutation();
  const { fetchNextPage, hasNextPage } = usePostListQuery('DATE_DESC');

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
    </main>
  );
}
