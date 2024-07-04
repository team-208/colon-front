import ProfileBoxUI, { ProfileBoxUIType } from './ProfileBoxUI';
import TabsUI, { TabsUIType } from './TabsUI';
import WriteFormCompUI, { WriteFormCompUIType } from './WriteFormCompUI';
import ListBoxUI, { ListBoxUIType } from './ListBoxUI';

const SkeletonComp: ProfileBoxUIType & TabsUIType & WriteFormCompUIType & ListBoxUIType = () => (
  <></>
);

SkeletonComp.ProfileBoxUI = ProfileBoxUI;
SkeletonComp.TabsUI = TabsUI;
SkeletonComp.WriteFormCompUI = WriteFormCompUI;
SkeletonComp.ListBoxUI = ListBoxUI;
export default SkeletonComp;
