export type ReactionType =
  | 'ThumbsUp'
  | 'Pushpin'
  | 'FaceWithMonocle'
  | 'ExplodingHead'
  | 'SmilingHeart';

export interface ReactionObjType extends Object {
  ThumbsUp?: number;
  Pushpin?: number;
  FaceWithMonocle?: number;
  ExplodingHead?: number;
  SmilingHeart?: number;
}
