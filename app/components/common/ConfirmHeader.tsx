'use client';

import styled from 'styled-components';
import HeaderComp from './HeaderComp';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ContainerFlex = styled(HeaderComp.Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ConfirmHeader = ({ onConfirm, onCancel }: Props) => {
  return (
    <ContainerFlex>
      <HeaderComp.CancelButton onClick={onCancel} />
      <HeaderComp.CompleteButton onClick={onConfirm} />
    </ContainerFlex>
  );
};

export default ConfirmHeader;
