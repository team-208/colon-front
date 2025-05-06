'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useModal from '@/app/hooks/useModal';

const RouterObserver = () => {
  const pathname = usePathname();
  const { modalState, closeModal } = useModal();

  useEffect(() => {
    if (modalState.isOpen) {
      closeModal();
    }
  }, [pathname]);

  return <></>;
};

export default RouterObserver;
