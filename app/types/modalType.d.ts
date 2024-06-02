export interface ModalTypes {
  title: string;
  contents: React.ReactNode;
  onClose?: () => void;
}

export interface ModalRecoilStateProps extends ModalTypes {
  isOpen: boolean;
}
