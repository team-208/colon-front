'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Container from './Container';
import AlertButton from './AlertButton';
import ProfileButton from './ProfileButton';

const ContainerFlex = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CancelButton = styled.button`
  width: 44px;
  height: 36px;
  padding: 8px 10px;
  color: #989ba2;
  ${({ theme }) => theme.font.body2}
`;

const CancelHeader = () => {
  const { push } = useRouter();

  // 임시
  const handleCancelClick = () => {
    push('/qna')
  };

  return (
    <ContainerFlex>
      <CancelButton onClick={handleCancelClick}>취소</CancelButton>

      <FlexRowDiv>
        <AlertButton />
        <ProfileButton />
      </FlexRowDiv>
    </ContainerFlex>
  );
};

export default CancelHeader;
export type CancelHeaderType = { CancelHeader: typeof CancelHeader };
