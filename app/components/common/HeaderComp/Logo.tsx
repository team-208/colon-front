'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import logoImg from '../../../assets/images/logo.png';

interface Props {
  margin?: string;
}

const LogoLink = styled(Link)<{ $margin: string }>`
  position: relative;
  width: 80px;
  height: 18px;
  margin: ${({ $margin }) => $margin};
`;

const Logo = ({ margin }: Props) => {
  return (
    <LogoLink href="/" $margin={margin || '0'}>
      <Image alt="" src={logoImg} sizes="80px" fill />
    </LogoLink>
  );
};

export default Logo;
