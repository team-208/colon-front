import ProfileBoxUI, { ProfileBoxUIType } from './ProfileBoxUI';
import TabsUI, { TabsUIType } from './TabsUI';
import WriteFormCompUI, { WriteFormCompUIType } from './WriteFormCompUI';

const SkeletonComp: ProfileBoxUIType & TabsUIType & WriteFormCompUIType = () => <></>;

SkeletonComp.ProfileBoxUI = ProfileBoxUI;
SkeletonComp.TabsUI = TabsUI;
SkeletonComp.WriteFormCompUI = WriteFormCompUI;
export default SkeletonComp;
