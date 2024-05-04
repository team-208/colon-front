import Emojis, { EmojisType } from './Emojis';
import Header, { HeaderType } from './Header';
import Wrapper, { WrapperType } from './Wrapper';

const CommentComp: WrapperType & HeaderType & EmojisType = () => <></>;

CommentComp.Wrapper = Wrapper;
CommentComp.Header = Header;
CommentComp.Emojis = Emojis;
export default CommentComp;
