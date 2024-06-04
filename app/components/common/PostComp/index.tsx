import Header, { HeaderType } from './Header';
import ReactionCount, { ReactionCountType } from './ReactionCount';

const PostComp: HeaderType & ReactionCountType = () => <></>;

PostComp.Header = Header;
PostComp.ReactionCount = ReactionCount;
export default PostComp;
