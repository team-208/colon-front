'use client';

import useModal from '@/app/hooks/useModal';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import ButtonComp from '../ButtomComp';
import { ButtonSizeStyle } from '../ButtomComp/style';

export interface ConfirmProps {
  children: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  isReverseButton?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ContainerDiv = styled.div`
  width: max-content;
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

  ${({ $isReverse }) =>
    $isReverse
      ? css`
          flex-direction: row-reverse;

          li:first-of-type {
            button {
              color: ${({ theme }) => theme.color.static.light};
              background-color: ${({ theme }) => theme.color.primary.normal} !important;
              margin-left: 12px;
            }
          }
        `
      : css`
          li:last-of-type {
            button {
              color: ${({ theme }) => theme.color.static.light};
              background-color: ${({ theme }) => theme.color.primary.normal} !important;
            }
          }
        `}
`;

const StyledButton = styled(ButtonComp.OutlinedPrimary)`
  ${({ theme }) => theme.mediaQuery.mobile} {
    ${ButtonSizeStyle('md')}
  }
`;

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
          <StyledButton
            size={'lg'}
            text={confirmLabel}
            onClick={onConfirm}
            hoverEffect={false}
            isActive
          />
        </li>
        <li>
          <StyledButton
            size={'lg'}
            text={cancelLabel}
            onClick={onCancel}
            hoverEffect={false}
            isActive
          />
        </li>
      </ButtonBoxUl>
    </ContainerDiv>
  );
};

export default Confirm;
export type ConfirmType = { Confirm: typeof Confirm };
