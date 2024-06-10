'use client';

import Image from 'next/image';
import styled from 'styled-components';
import icon_bell from '@/app/assets/images/header/icon_bell.png';

const Button = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
`;

const AlertButton = () => {
  return (
    <Button>
      <Image alt="알림 아이콘" src={icon_bell} fill sizes="24px" />
    </Button>
  );
};

export default AlertButton;
export type AlertButtonType = { AlertButton: typeof AlertButton };
