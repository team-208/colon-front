'use client';

import useModal from '@/app/hooks/useModal';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import ButtonComp from '../ButtomComp';

export interface ConfirmProps {
  children: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  isReverseButton?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ContainerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 28px 21px 16px;
  background-color: ${({ theme }) => theme.color.static.light};
  border-radius: 14px;
  ${({ theme }) => theme.font.body2};
  text-align: center;
  white-space: pre-line;
`;

const ButtonBoxUl = styled.ul<{ $isReverse: boolean }>`
  display: flex;
  margin-top: 22px;

  & > li:last-of-type {
    margin-left: 12px;
  }

  ${({ $isReverse }) =>
    $isReverse &&
    css`
      flex-direction: row-reverse;
    `}
`;

const ConfirmButton = styled(ButtonComp.OutlinedPrimary)``;

const CancelButton = styled(ButtonComp.OutlinedPrimary)``;

const Confirm = ({
  children,
  confirmLabel,
  cancelLabel,
  isReverseButton,
  onConfirm,
  onCancel,
}: ConfirmProps) => {
  const {} = useModal();

  return (
    <ContainerDiv>
      {children}
      <ButtonBoxUl $isReverse={!!isReverseButton}>
        <li>
          <ConfirmButton size={'md'} text={confirmLabel} onClick={onConfirm} isActive />
        </li>
        <li>
          <CancelButton size={'md'} text={cancelLabel} onClick={onCancel} isActive />
        </li>
      </ButtonBoxUl>
    </ContainerDiv>
  );
};

export default Confirm;
export type ConfirmType = { Confirm: typeof Confirm };
