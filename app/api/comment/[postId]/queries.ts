import { UseQueryResult, useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { fetchGetComments } from './fetch';
import { GetCommentsResponseItem } from './type';

const useCommentsQuery = (postId: string): UseQueryResult<GetCommentsResponseItem[], Error> =>
  useQuery({
    queryKey: QUERY_KEYS.commentList(postId),
    queryFn: () => fetchGetComments(postId),
    select: (data) => {
      const rootComments = data.data?.filter((comment) => !comment?.original_comment);

      const newValue = rootComments?.map((comment) => ({
        ...comment,
        nestedComments: data.data.filter(({ original_comment }) => original_comment === comment.id),
      }));
      // 대댓글 parsing
      return newValue as GetCommentsResponseItem[];
    },
  });

export default useCommentsQuery;
