import Header, { HeaderType } from './Header';
import PostCompRegacy, { PostCompRegacyType } from './PostCompRegacy';
import ReactionCount, { ReactionCountType } from './ReactionCount';
import CommentCount, { CommentCountType } from './CommentCount';

const PostComp: HeaderType & ReactionCountType & PostCompRegacyType & CommentCountType= () => <></>;

PostComp.Header = Header;
PostComp.ReactionCount = ReactionCount;
PostComp.CommentCount = CommentCount;
PostComp.PostCompRegacy = PostCompRegacy;
export default PostComp;
