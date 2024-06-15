'use client';

import { useRecoilValue } from 'recoil';
import { tooltipState } from '@/app/recoils';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  position: fixed;
  z-index: 1000;
`;

const Container = () => {
  const { isVisible, tooltipProps } = useRecoilValue(tooltipState);

  return <>{isVisible && <ContainerDiv>{tooltipProps.contents}</ContainerDiv>}</>;
};

export default Container;
export type ContainerType = { Container: typeof Container };
