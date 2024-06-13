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
  const [{ visible, tooltipProps }, setTooltip] = useRecoilState(tooltipState);

  useEffect(() => {
    if (visible)
      setTimeout(() => {
        setTooltip((cur) => {
          return {
            ...cur,
            visible: false,
          };
        });
      }, 2000);
  }, [visible]);

  return <>{visible && <ContainerDiv>{tooltipProps.contents}</ContainerDiv>}</>;
};

export default Container;
export type ContainerType = { Container: typeof Container };
