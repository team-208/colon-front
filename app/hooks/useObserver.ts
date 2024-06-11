import { useCallback, useRef } from 'react';

const useObserver = (
  infinitScroll: boolean,
  callback: () => void,
  options?: IntersectionObserverInit | undefined,
) => {
  const ref = useRef<IntersectionObserver | null>(null);

  const observerRef = useCallback((node: HTMLDivElement) => {
    if (ref.current) {
      ref.current.disconnect();
    }

    ref.current = infinitScroll
      ? new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        }, options)
      : new IntersectionObserver(() => {
          callback();
        }, options);

    if (node) {
      ref.current.observe(node);
    }
  }, []);

  return {
    observerRef,
  };
};

export default useObserver;
