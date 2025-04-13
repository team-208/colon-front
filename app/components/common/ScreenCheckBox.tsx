'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { mobileScreenState } from '@/app/recoils';

const ScreenCheckBox = () => {
  const setMobileScreen = useSetRecoilState(mobileScreenState);

  useEffect(() => {
    const resize = (e: any) => {
      // setMobileScreen(true);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <></>;
};

export default ScreenCheckBox;
