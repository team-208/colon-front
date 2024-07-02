import Reactions, { ReactionsType } from './Reactions';
import Header, { HeaderType } from './Header';
import Wrapper, { WrapperType } from './Wrapper';
import ReactionCount, { ReactionCountType } from './ReactionCount';

const CommentComp: ReactionCountType & WrapperType & HeaderType & ReactionsType = () => <></>;

CommentComp.ReactionCount = ReactionCount;
CommentComp.Wrapper = Wrapper;
CommentComp.Header = Header;
CommentComp.Reactions = Reactions;
export default CommentComp;
