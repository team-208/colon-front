import AuthHeader, { AuthHeaderType } from './AuthHeader';
import SearchHeader, {SearchHeaderType} from './SearchHeader';

const HeaderComp: AuthHeaderType & SearchHeaderType = () => <></>;

HeaderComp.AuthHeader = AuthHeader;
HeaderComp.SearchHeader = SearchHeader;
export default HeaderComp;
