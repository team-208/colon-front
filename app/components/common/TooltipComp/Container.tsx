'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tooltipState } from '@/app/recoils';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  position: fixed;
  z-index: 1000;
`;

const Container = () => {
  const [{ isVisible, tooltipProps }, setTooltip] = useRecoilState(tooltipState);

  useEffect(() => {
    if (isVisible)
      setTimeout(() => {
        setTooltip((cur) => {
          return {
            ...cur,
            visible: false,
          };
        });
      }, 2000);
  }, [isVisible]);

  return <>{isVisible && <ContainerDiv>{tooltipProps.contents}</ContainerDiv>}</>;
};

export default Container;
export type ContainerType = { Container: typeof Container };
