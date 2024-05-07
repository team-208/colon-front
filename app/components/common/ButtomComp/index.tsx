import Solid, { SolidType } from './Solid';
import OutlinedPrimary, { OutlinedPrimaryType } from './OutlinedPrimary';

const ButtonComp: SolidType & OutlinedPrimaryType = () => <></>;

ButtonComp.Solid = Solid;
ButtonComp.OutlinedPrimary = OutlinedPrimary;
export default ButtonComp;
