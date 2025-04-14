'use client';

import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useSetRecoilState } from 'recoil';
import { mobileScreenState } from '@/app/recoils';

const ScreenCheckBox = () => {
  const setMobileScreen = useSetRecoilState(mobileScreenState);

  const mobileCheck = useCallback(() => {
    setMobileScreen(window.matchMedia('only screen and (max-width: 767px)').matches);
  }, []);

  useEffect(() => {
    mobileCheck()

    const resize = debounce(() => {
      mobileCheck()
    }, 500);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <></>;
};

export default ScreenCheckBox;
