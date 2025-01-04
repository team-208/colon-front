import Container, { ContainerType } from './Container';
import Basic, { BasicType } from './Basic';
import Bubble, { BubbleType } from './Bubble';

const TooltipComp: BasicType & ContainerType & BubbleType = () => <></>;

TooltipComp.Basic = Basic;
TooltipComp.Container = Container;
TooltipComp.Bubble = Bubble;

export default TooltipComp;
