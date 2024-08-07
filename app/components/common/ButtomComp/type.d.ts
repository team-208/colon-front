export type BUTTON_SIZE = 'lg' | 'md' | 'sm';

export interface ButtonProps {
  children?: ReactNode;
  text?: string;
  isActive: boolean;
  onClick: () => void;
  size?: BUTTON_SIZE;
  hoverEffect?: boolean;
  focusEffect?: boolean;
}