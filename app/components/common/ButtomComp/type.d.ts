export interface ButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'lg' | 'md' | 'sm';
}