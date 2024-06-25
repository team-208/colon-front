import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { fetchGetComments } from './fetch';

const useCommentsQuery = (postId: string) =>
  useQuery({
    queryKey: QUERY_KEYS.commentList(postId),
    queryFn: () => fetchGetComments(postId),
    select: (data) => {
      const rootComments = data.data?.filter((comment) => !comment?.original_comment);

      // 대댓글 parsing
      return rootComments?.map((comment) => ({
        ...comment,
        nestedComments: data.data.filter(({ original_comment }) => original_comment === comment.id),
      }));
    },
  });

export default useCommentsQuery;
