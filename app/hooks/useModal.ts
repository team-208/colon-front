import { useRecoilState } from 'recoil';
import { modalInitValue, modalState } from '../recoils/modal/atom';
import { ModalTypes } from '../types/modalType';

const useModal = () => {
  const [_modalState, setModalState] = useRecoilState(modalState);

  // 모달 오픈 & modalProps 설정
  const openModal = (props: ModalTypes, screen = false) => {
    setModalState({ ...props, isOpen: true, isScreen: screen });
  };

  // 모달 클로즈 & modalProps 초기화
  const closeModal = () => {
    setModalState(modalInitValue);
  };

  return {
    modalState: _modalState,
    openModal,
    closeModal,
  };
};

export default useModal;
