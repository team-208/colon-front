import { ReactionObjType } from '@/app/components/common/PostComp/type';

export interface UpdatePostReactionsRequest {
  postId: number;
  reactions: ReactionObjType;
}

export interface UpdatePostReactionsResponse {
  success: boolean;
}
