'use client';

import styled from 'styled-components';
import AnimatonBox from './AnimationBox';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  height: max-content;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const CircleDiv = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.palette.coolNeutral99};
  margin-right: 16px;
`;

const BoxDiv1 = styled.div`
  width: 157px;
  height: 14px;
  border-radius: 17px;
  background-color: ${({ theme }) => theme.color.palette.coolNeutral99};
  margin-bottom: 10px;
`;

const BoxDiv2 = styled.div`
  width: 70px;
  height: 23px;
  border-radius: 17px;
  background-color: ${({ theme }) => theme.color.palette.coolNeutral99};
`;

const ProfileBoxUI = () => {
  return (
    <AnimatonBox>
      <Container>
        <CircleDiv />
        <div>
          <BoxDiv1 />
          <BoxDiv2 />
        </div>
      </Container>
    </AnimatonBox>
  );
};

export default ProfileBoxUI;
export type ProfileBoxUIType = { ProfileBoxUI: typeof ProfileBoxUI };
