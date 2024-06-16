'use client';

import { writeHeaderState } from '@/app/recoils';
import { useRecoilValue } from 'recoil';
import CancelHeader from '@/app/components/common/CancelHeader';

const WriteHeader = () => {
  const { onCancel } = useRecoilValue(writeHeaderState);

  return <CancelHeader onCancel={onCancel} />;
};

export default WriteHeader;
