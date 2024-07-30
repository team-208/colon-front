'use client';

import styled from 'styled-components';
import AnimatonBox from './AnimationBox';

const Container = styled.div`
  padding-top: 40px;
`;

const BoxDiv1 = styled.div`
  display: inline-block;
  width: 56px;
  height: 28px;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 10px;

  &:not(:last-of-type) {
    margin-right: 16px;
  }
`;

const BoxDiv2 = styled.div`
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 15px;
  margin: 24px 0 12px 0;
`;

const BoxDiv3 = styled.div`
  width: 100%;
  height: 273px;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 15px;
`;

const WriteFormCompUI = () => {
  return (
    <Container>
      <AnimatonBox>
        <div>
          <BoxDiv1 />
          <BoxDiv1 />
          <BoxDiv1 />
        </div>
        <BoxDiv2 />
        <BoxDiv3 />
      </AnimatonBox>
    </Container>
  );
};

export default WriteFormCompUI;
export type WriteFormCompUIType = { WriteFormCompUI: typeof WriteFormCompUI };
