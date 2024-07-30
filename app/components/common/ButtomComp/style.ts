import {css} from 'styled-components'
import { BUTTON_SIZE } from './type';

export const ButtonSizeStyle = (size: BUTTON_SIZE) => {
  switch (size) {
    case 'lg':
      return css`
        ${({ theme }) => theme.font.body1}
        width: fit-content;
        height: 50px;
        border-radius: 15px;
        padding: 12px 28px;
        `;
    case 'sm':
      return css`
        ${({ theme }) => theme.font.body3}
        width: fit-content;
        height: 34px;
        border-radius: 12px;
        padding: 8px 20px;
        `;
    case 'md':
      default:
        return css`
        ${({ theme }) => theme.font.body2}
        width: fit-content;
        height: 40px;
        border-radius: 13px;
        padding: 10px 24px;
      `;
  }
};