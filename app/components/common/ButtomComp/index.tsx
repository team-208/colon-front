import Solid, { SolidType } from './Solid';
import OutlinedPrimary, { OutlinedPrimaryType } from './OutlinedPrimary';
import Gradient, { GradientType } from './Gradient';

const ButtonComp: SolidType & OutlinedPrimaryType & GradientType = () => <></>;

ButtonComp.Solid = Solid;
ButtonComp.OutlinedPrimary = OutlinedPrimary;
ButtonComp.Gradient = Gradient;
export default ButtonComp;
