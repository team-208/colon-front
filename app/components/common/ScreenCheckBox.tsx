'use client';

import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { isIPhone13, isMobileOnly } from 'react-device-detect';
import { useSetRecoilState } from 'recoil';
import { mobileScreenState } from '@/app/recoils';

const ScreenCheckBox = () => {
  const setMobileScreen = useSetRecoilState(mobileScreenState);
  
  useEffect(() => {
    setMobileScreen(isIPhone13 || isMobileOnly);

    console.log('isIPhone13', isIPhone13)
    console.log('isMobileOnly', isMobileOnly)
  }, []);

  return <></>;
};

export default ScreenCheckBox;
