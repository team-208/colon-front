import { useInfiniteQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../queryKeys';
import { fetchGetPostList } from './fetch';
import { GetPostListResponse, PostListOrderTypes } from './type';

const usePostListQuery = (order: PostListOrderTypes) =>
  useInfiniteQuery<GetPostListResponse, Error>({
    queryKey: QUERY_KEYS.postList(),
    queryFn: ({ pageParam = 0 }) => fetchGetPostList({ offset: pageParam as number, order }),
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.offset === 0 ? undefined : firstPage.offset - 1,
    getNextPageParam: (lastPage) =>
      lastPage.totalCount <= (lastPage.offset + 1) * 20 ? undefined : lastPage.offset + 1,
  });

export default usePostListQuery;
