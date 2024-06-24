import Header, { HeaderType } from './Header';
import ReactionCount, { ReactionCountType } from './ReactionCount';
import CommentCount, { CommentCountType } from './CommentCount';
import CountBox, { CountBoxType } from './CountBox';
import ScrapButton, { ScrapButtonType } from './ScrapButton';
import MajorBox, { MajorBoxType } from './MajorBox';

const PostComp: HeaderType &
  ReactionCountType &
  CommentCountType &
  CountBoxType &
  ScrapButtonType &
  MajorBoxType = () => <></>;

PostComp.Header = Header;
PostComp.ReactionCount = ReactionCount;
PostComp.CommentCount = CommentCount;
PostComp.CountBox = CountBox;
PostComp.ScrapButton = ScrapButton;
PostComp.MajorBox = MajorBox;
export default PostComp;
