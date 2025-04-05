import { useCallback, useRef } from 'react';

/**
 *
 * @param infinitScroll infinitScroll을 위해 감시하는 컴포넌트인지의 여부 boolean 값
 * @param callback 조건 부합시 호출되는 함수
 * @param options IntersectionObserver 인스턴스 생성시 전달할 options
 * @returns
 */

const useObserver = (
  infinitScroll: boolean,
  callback: () => void,
  options?: IntersectionObserverInit | undefined,
) => {
  const ref = useRef<IntersectionObserver | null>(null);
  let loading = false;

  const observerRef = useCallback((node: HTMLDivElement) => {
    if (ref.current) {
      ref.current.disconnect();
    }

    /**
     * IntersectionObserverEntry.isIntersecting - 타겟 요소가 루트 요소와 교차하는 지 여부를 Boolean 값으로 반환
     * IntersectionObserverEntry.intersectionRatio - 타겟 요소와 루트 요소의 교차 비율 반환
     * */
    ref.current = infinitScroll
      ? new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && !loading) {
            load();
          }
        }, options)
      : new IntersectionObserver(() => {
          callback();
        }, options);

    if (node) {
      ref.current.observe(node);
    }
  }, []);

  const load = () => {
    loading = true;
    setTimeout(() => {
      callback();
      loading = false;
    }, 1000);
  }

  return {
    observerRef,
  };
};

export default useObserver;
