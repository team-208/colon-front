'use client';

import styled from 'styled-components';
import AnimatonBox from './AnimationBox';

const Container = styled.div`
  width: 100%;
  padding: 24px 20px;
  overflow: hidden;
`;

const BoxDiv = styled.div`
  width: 100%;
  height: 182px;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 17px;

  &:not(:last-of-type) {
    margin-bottom: 40px;
  }
`;

const TabsUI = () => {
  return (
    <Container>
      <AnimatonBox>
        <BoxDiv />
        <BoxDiv />
      </AnimatonBox>
    </Container>
  );
};

export default TabsUI;
export type TabsUIType = { TabsUI: typeof TabsUI };
