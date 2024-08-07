import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * @name useLockedBody
 *
 * @description body 스크롤 방지 hooks
 *
 * @param (initialLocked: boolean)
 *
 * @returns [boolean, Dispatch<SetStateAction<boolean>>]
 *
 * @version 0.0.12
 */

const useLockedBody = (initialLocked = false): [boolean, Dispatch<SetStateAction<boolean>>] => {
  // useState
  const [locked, setLocked] = useState<boolean>(initialLocked);

  // useEffect
  useEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [locked]);

  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
};

export default useLockedBody;
