'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import logoImg from '../../../assets/images/logo.png';
import useAuth from '@/app/hooks/useAuth';

interface Props {
  margin?: string;
}

const LogoLink = styled(Link)<{ $margin: string }>`
  position: relative;
  width: 80px;
  height: 42px;
  margin: ${({ $margin }) => $margin};
`;

const Logo = ({ margin }: Props) => {
  const { userInfo } = useAuth();

  return (
    <LogoLink href={`${userInfo?.user ? '/qna' : '/'}`} $margin={margin || '0'}>
      <Image alt="" src={logoImg} sizes="80px" fill />
    </LogoLink>
  );
};

export default Logo;
export type LogoType = { Logo: typeof Logo };
