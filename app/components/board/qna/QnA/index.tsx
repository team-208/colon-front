import Header, { HeaderType } from './Header';
import ReactionCount, { ReactionCountType } from './ReactionCount';

const QnA: HeaderType & ReactionCountType = () => <></>;

QnA.Header = Header;
QnA.ReactionCount = ReactionCount;
export default QnA;
