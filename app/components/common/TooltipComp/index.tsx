import Container, { ContainerType } from './Container';
import Basic, { BasicType } from './Basic';

const TooltipComp: BasicType & ContainerType = () => <></>;

TooltipComp.Basic = Basic;
TooltipComp.Container = Container;

export default TooltipComp;
