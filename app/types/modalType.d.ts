export interface ModalTypes {
  modalProps: ConfirmProps;
}

export interface ModalRecoilStateProps extends ModalTypes {
  isOpen: boolean;
  isScreen?: boolean; // 화면 전체로 띄울지 여부
}
