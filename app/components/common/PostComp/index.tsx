import Header, { HeaderType } from './Header';
import ReactionCount, { ReactionCountType } from './ReactionCount';
import ScrapButton, { ScrapButtonType } from './ScrapButton';
import MajorBox, { MajorBoxType } from './MajorBox';

const PostComp: HeaderType & ReactionCountType & ScrapButtonType & MajorBoxType = () => <></>;

PostComp.Header = Header;
PostComp.ReactionCount = ReactionCount;
PostComp.ScrapButton = ScrapButton;
PostComp.MajorBox = MajorBox;
export default PostComp;
