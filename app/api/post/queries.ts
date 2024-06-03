import { useInfiniteQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../queryKeys';
import { fetchGetPostList } from './fetch';
import { GetPostListQuery, GetPostListResponse, PostListOrderTypes } from './type';
import { PAGE_OFFSET_VALUE } from './constants';

const usePostListQuery = ({ order, major }: Omit<GetPostListQuery, 'offset'>) =>
  useInfiniteQuery<GetPostListResponse, Error>({
    queryKey: QUERY_KEYS.postList(),
    queryFn: ({ pageParam = 0 }) => fetchGetPostList({ offset: pageParam as number, order, major }),
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.offset === 0 ? undefined : firstPage.offset - 1,
    getNextPageParam: (lastPage) =>
      lastPage.totalCount <= (lastPage.offset + 1) * PAGE_OFFSET_VALUE
        ? undefined
        : lastPage.offset + 1,
  });

export default usePostListQuery;
