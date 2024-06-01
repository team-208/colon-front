import AuthHeader, { AuthHeaderType } from './AuthHeader';
import SearchHeader, { SearchHeaderType } from './SearchHeader';
import CancelHeader, { CancelHeaderType } from './CancelHeader';
import ConfirmHeader, { ConfirmHeaderType } from './ConfirmHeader';

const HeaderComp: AuthHeaderType & SearchHeaderType & CancelHeaderType & ConfirmHeaderType = () => (
  <></>
);

HeaderComp.AuthHeader = AuthHeader;
HeaderComp.SearchHeader = SearchHeader;
HeaderComp.CancelHeader = CancelHeader;
HeaderComp.ConfirmHeader = ConfirmHeader;
export default HeaderComp;
