'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { headerMenu } from '@/app/constants/menu';

const HeaderNav = styled.nav`
  li {
    display: inline-flex;
    height: inherit;
    ${({ theme }) => theme.font.body3}

    a {
      color: ${({ theme }) => theme.color.label.normal};
    }

    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
`;

const Navigation = () => {
  return (
    <HeaderNav>
      <ul>
        {headerMenu.map((v) => (
          <li key={v.id}>
            <Link href={v.route}>{v.text}</Link>
          </li>
        ))}
      </ul>
    </HeaderNav>
  );
};

export default Navigation;
export type NavigationType = { Navigation: typeof Navigation };
