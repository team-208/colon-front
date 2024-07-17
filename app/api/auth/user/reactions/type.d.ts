interface UserReactionProps {
  posts: {
    postId: string;
    reactions: ReactionObjType;
  }[];
  comments: number[];
}

export interface GetUserReactionsResponse extends UserReactionProps {
  success: boolean;
}

export interface UpdateUserReactionsRequest extends UserReactionProps {}
