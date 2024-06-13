'use client';

import useTooltip from '@/app/hooks/useTooltip';
import TooltipComp from '@/app/components/common/TooltipComp';

export default function TooltipPage() {
  const { visibleTooltip } = useTooltip();

  const handleClick = () => {
    visibleTooltip({
      tooltipProps: { contents: <TooltipComp.Basic position="center" text="테스트 툴팁입니다." /> },
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Tooltip 띄우기</button>
    </div>
  );
}
