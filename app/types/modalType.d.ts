export interface ModalTypes {
  contents: string | React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  isReverseButton?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ModalRecoilStateProps extends ModalTypes {
  isOpen: boolean;
}
