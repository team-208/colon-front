'use client';

import { myPageHeaderState } from '@/app/recoils';
import { useRecoilValue } from 'recoil';
import BasicHeader from '../common/BasicHeader';
import ConfirmHeader from '../common/ConfirmHeader';

const MyPageHeader = () => {
  const { isModify, onConfirm, onCancel } = useRecoilValue(myPageHeaderState);

  return (
    <>{isModify ? <ConfirmHeader onConfirm={onConfirm} onCancel={onCancel} /> : <BasicHeader />}</>
  );
};

export default MyPageHeader;
