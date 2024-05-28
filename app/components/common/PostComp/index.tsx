import Header, { HeaderType } from './Header';
import PostCompRegacy, { PostCompRegacyType } from './PostCompRegacy';
import ReactionCount, { ReactionCountType } from './ReactionCount';

const PostComp: HeaderType & ReactionCountType & PostCompRegacyType = () => <></>;

PostComp.Header = Header;
PostComp.ReactionCount = ReactionCount;
PostComp.PostCompRegacy = PostCompRegacy;
export default PostComp;
