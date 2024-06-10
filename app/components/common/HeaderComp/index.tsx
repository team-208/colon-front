import Container, { ContainerType } from './Container';
import Logo, { LogoType } from './Logo';
import Navigation, { NavigationType } from './Navigation';
import SearchButton, { SearchButtonType } from './SearchButton';
import AlertButton, { AlertButtonType } from './AlertButton';
import ProfileButton, { ProfileButtonType } from './ProfileButton';

const HeaderComp: ContainerType & LogoType & NavigationType & SearchButtonType & ProfileButtonType & AlertButtonType = () => <></>;

HeaderComp.Container = Container;
HeaderComp.Logo = Logo;
HeaderComp.Navigation = Navigation;
HeaderComp.SearchButton = SearchButton;
HeaderComp.AlertButton = AlertButton;
HeaderComp.ProfileButton = ProfileButton;
export default HeaderComp;
