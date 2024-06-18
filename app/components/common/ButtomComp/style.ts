import {css} from 'styled-components'

export const ButtonSizeStyle = (size: string) => {
  switch (size) {
    case 'lg':
      return css`
        ${({ theme }) => theme.font.body1};
        min-width: 160px;
        height: 50px;
        border-radius: 15px;
        padding: 12px 28px;
      `;
    case 'sm':
      return css`
        ${({ theme }) => theme.font.body3}
        min-width: 128px;
        height: 36px;
        border-radius: 12px;
        padding: 8px 20px;
      `;
    case 'md':
    default:
      return css`
        ${({ theme }) => theme.font.body2}
        min-width: 140px;
        height: 40px;
        border-radius: 13px;
        padding: 10px 24px;
      `;
  }
};