'use client';

import useTooltip from '@/app/hooks/useTooltip';
import TooltipComp from '@/app/components/common/TooltipComp';
import styled from 'styled-components';
import { useState } from 'react';

const BubbleButton = styled.button`
  margin: 50px 100px;
  display: block;
  position: relative;
`;

export default function TooltipPage() {
  const { visibleTooltip } = useTooltip();
  const [isOpenTopBubble, setIsOpenTopBubble] = useState<boolean>(false);
  const [isOpenLeftBubble, setIsOpenLeftBubble] = useState<boolean>(false);
  const [isOpenBottomBubble, setIsOpenBottomBubble] = useState<boolean>(false);
  const [isOpenRightBubble, setIsOpenRightBubble] = useState<boolean>(false);

  const handleClick = () => {
    visibleTooltip({
      tooltipProps: { contents: <TooltipComp.Basic position="center" text="테스트 툴팁입니다." /> },
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Tooltip 띄우기</button>

      <BubbleButton
        onClick={() => {
          setIsOpenTopBubble((prev) => !prev);
        }}
      >
        top bubble
        {isOpenTopBubble && (
          <TooltipComp.Bubble bubblePosition={{ align: 'top' }}>top tooltip</TooltipComp.Bubble>
        )}
      </BubbleButton>

      <BubbleButton
        onClick={() => {
          setIsOpenLeftBubble((prev) => !prev);
        }}
      >
        left bubble
        {isOpenLeftBubble && (
          <TooltipComp.Bubble bubblePosition={{ align: 'left' }}>left tooltip</TooltipComp.Bubble>
        )}
      </BubbleButton>

      <BubbleButton
        onClick={() => {
          setIsOpenBottomBubble((prev) => !prev);
        }}
      >
        bottom bubble
        {isOpenBottomBubble && (
          <TooltipComp.Bubble bubblePosition={{ align: 'bottom' }}>
            bottom tooltip
          </TooltipComp.Bubble>
        )}
      </BubbleButton>

      <BubbleButton
        onClick={() => {
          setIsOpenRightBubble((prev) => !prev);
        }}
      >
        right bubble
        {isOpenRightBubble && (
          <TooltipComp.Bubble bubblePosition={{ align: 'right' }}>right tooltip</TooltipComp.Bubble>
        )}
      </BubbleButton>
    </div>
  );
}
