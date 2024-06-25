import Horizonal, { HorizonalType } from './Horizonal';
import Vertical, { VerticalType } from './Vertical';

const Divider: HorizonalType & VerticalType = () => <></>;

Divider.Horizonal = Horizonal;
Divider.Vertical = Vertical;
export default Divider;
