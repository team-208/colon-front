import AuthHeader, { AuthHeaderType } from './AuthHeader';
import SearchHeader, { SearchHeaderType } from './SearchHeader';
import CancelHeader, { CancelHeaderType } from './CancelHeader';

const HeaderComp: AuthHeaderType & SearchHeaderType & CancelHeaderType = () => <></>;

HeaderComp.AuthHeader = AuthHeader;
HeaderComp.SearchHeader = SearchHeader;
HeaderComp.CancelHeader = CancelHeader;
export default HeaderComp;
