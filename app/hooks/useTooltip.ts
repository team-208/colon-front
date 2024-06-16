import { useRecoilState } from 'recoil';
import { tooltipState } from '../recoils';
import { TooltipTypes } from '../types/tooltipType';

const useTooltip = () => {
  const [_tooltipState, setTooltipState] = useRecoilState(tooltipState);

  const visibleTooltip = (props: TooltipTypes) => {
    setTooltipState({ ...props, isVisible: true });

    setTimeout(() => {
      setTooltipState({ ...props, isVisible: false });
    }, 2000);
  };

  return {
    tooltipState: _tooltipState,
    visibleTooltip,
  };
};

export default useTooltip;
