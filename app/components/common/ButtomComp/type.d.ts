export interface ButtonProps {
  children?: ReactNode;
  text?: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'lg' | 'md' | 'sm';
}