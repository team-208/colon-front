import Confirm, { ConfirmType } from './Confirm';
import Container, { ContainerType } from './Container';

const Modal: ConfirmType & ContainerType = () => <></>;

Modal.Container = Container;
Modal.Confirm = Confirm;
export default Modal;
