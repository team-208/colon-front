import Emojis, { EmojisType } from './Emojis';
import Header, { HeaderType } from './Header';
import Wrapper, { WrapperType } from './Wrapper';
import ReactionCount, { ReactionCountType } from './ReactionCount';

const CommentComp: ReactionCountType & WrapperType & HeaderType & EmojisType = () => <></>;

CommentComp.ReactionCount = ReactionCount;
CommentComp.Wrapper = Wrapper;
CommentComp.Header = Header;
CommentComp.Emojis = Emojis;
export default CommentComp;
