import { ReactionType } from '@/app/components/common/PostComp/type';

export interface UpdateCommentReactionRequest {
  commentId: number;
  curReactionCount: number;
}

export interface UpdateCommentReactionResponse {
  success: boolean;
}

export interface UserReactionsObjType {
  posts: {
    postId: number;
    reaction: ReactionType;
  }[];
  comments: number[];
}
