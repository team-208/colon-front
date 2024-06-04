'use client';

import { useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { scrollState } from '@/app/recoils';
import styled from 'styled-components';

const ScrollBoxDiv = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.heightSizes.header.desktop}px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    height: ${({ theme }) => theme.heightSizes.header.mobile}px;
  }
`;

const ScrollBox = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const setScroll = useSetRecoilState(scrollState);

  useEffect(() => {

    /* 
      IntersectionObserverEntry.isIntersecting - 타겟 요소가 루트 요소와 교차하는 지 여부를 Boolean 값으로 반환
      IntersectionObserverEntry.intersectionRatio - 타겟 요소와 루트 요소의 교차 비율 반환
      값을 통해 callback 함수 최초 1회 실행을 방지하지만 저희는 0.9라는 1에 가까운 값을 체크해야하고
      스크롤이 빠르게 진행되다 보면 정확히 0.9라는 값에서 callback 함수가 실행이 되지 않기 떄문에
      scrollState atom 값의 default 값을 true로 설정해 주었습니다. 
    */
   
    const callback: IntersectionObserverCallback = () => {
      setScroll((cur) => !cur);
    };

    const observer = new IntersectionObserver(callback, {
      threshold: 0.9,
    });

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [boxRef.current]);

  return <ScrollBoxDiv ref={boxRef} />;
};

export default ScrollBox;
