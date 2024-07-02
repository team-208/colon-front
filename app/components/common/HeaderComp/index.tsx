import Container, { ContainerType } from './Container';
import Logo, { LogoType } from './Logo';
import Navigation, { NavigationType } from './Navigation';
import SearchButton, { SearchButtonType } from './SearchButton';
import AlertButton, { AlertButtonType } from './AlertButton';
import ProfileButton, { ProfileButtonType } from './ProfileButton';
import CancelButton, { CancelButtonType } from './CancelButton';
import CompleteButton, { CompleteButtonType } from './CompleteButton';

const HeaderComp: ContainerType &
  LogoType &
  NavigationType &
  SearchButtonType &
  ProfileButtonType &
  AlertButtonType &
  CancelButtonType &
  CompleteButtonType = () => <></>;

HeaderComp.Container = Container;
HeaderComp.Logo = Logo;
HeaderComp.Navigation = Navigation;
HeaderComp.SearchButton = SearchButton;
HeaderComp.AlertButton = AlertButton;
HeaderComp.ProfileButton = ProfileButton;
HeaderComp.CancelButton = CancelButton;
HeaderComp.CompleteButton = CompleteButton;
export default HeaderComp;
