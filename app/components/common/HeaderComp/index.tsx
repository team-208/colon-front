import BasicHeader, { BasicHeaderType } from './BasicHeader';
import SearchHeader, { SearchHeaderType } from './SearchHeader';
import CancelHeader, { CancelHeaderType } from './CancelHeader';
import ConfirmHeader, { ConfirmHeaderType } from './ConfirmHeader';

const HeaderComp: BasicHeaderType &
  SearchHeaderType &
  CancelHeaderType &
  ConfirmHeaderType = () => <></>;

HeaderComp.BasicHeader = BasicHeader;
HeaderComp.SearchHeader = SearchHeader;
HeaderComp.CancelHeader = CancelHeader;
HeaderComp.ConfirmHeader = ConfirmHeader;
export default HeaderComp;
