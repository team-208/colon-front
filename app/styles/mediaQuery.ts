import { CSSObject, CSSProp, RuleSet, css } from 'styled-components';

export interface DeviceProps {
  mobile: number;
  tablet: number;
  desktop: number;
}

const deviceSizes: DeviceProps = {
  mobile: 767,
  tablet: 991,
  desktop: 992,
};

const mediaQuery = {
  mobile: `@media only screen and (max-width: ${deviceSizes.mobile}px)`,
  tablet: `@media only screen and (max-width: ${deviceSizes.tablet}px)`,
  desktop: `@media only screen and (max-width: ${deviceSizes.desktop}px)`,
};

export default mediaQuery;
