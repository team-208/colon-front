'use client';

import styled from 'styled-components';
import AnimatonBox from './AnimationBox';

const Container = styled.div`
  width: 100%;
  padding: 8px 20px 28px 20px;
`;

const BoxDiv1 = styled.div`
  width: 100%;
  height: 23px;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 10px;
`;

const BoxDiv2 = styled.div`
  width: 100%;
  height: 14px;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 17px;
  margin: 10px 0;
`;

const BoxDiv3 = styled.div`
  width: 100%;
  height: 182px;
  background: ${({ theme }) => theme.color.palette.coolNeutral98};
  border-radius: 17px;
  margin-bottom: 40px;
`;

const ListBoxUI = () => {
  return (
    <Container>
      <AnimatonBox>
        <div>
          <BoxDiv1 />
          <BoxDiv2 />
          <BoxDiv3 />
        </div>
        <div>
          <BoxDiv1 />
          <BoxDiv2 />
          <BoxDiv3 />
        </div>
      </AnimatonBox>
    </Container>
  );
};

export default ListBoxUI;
export type ListBoxUIType = { ListBoxUI: typeof ListBoxUI };
