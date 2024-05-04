import Header, { HeaderType } from './Header';
import Wrapper, { WrapperType } from './Wrapper';

const CommentComp: WrapperType & HeaderType = () => <></>;

CommentComp.Wrapper = Wrapper;
CommentComp.Header = Header;
export default CommentComp;
