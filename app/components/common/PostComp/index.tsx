import Header, { HeaderType } from './Header';
import ReactionCount, { ReactionCountType } from './ReactionCount';
import ScrapButton, { ScrapButtonType } from './ScrapButton';

const PostComp: HeaderType & ReactionCountType & ScrapButtonType = () => <></>;

PostComp.Header = Header;
PostComp.ReactionCount = ReactionCount;
PostComp.ScrapButton = ScrapButton;
export default PostComp;
