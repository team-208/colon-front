import { atom } from 'recoil';
import { TooltipRecoilStateProps } from '@/app/types/tooltipType';
import { RECOIL_KEYS } from '../key.d';

export const tooltipInitValue: TooltipRecoilStateProps = {
  visible: false,
  tooltipProps: {
    contents: ''
  },
};

export const tooltipState = atom({
  key: RECOIL_KEYS.tooltipState,
  default: tooltipInitValue,
});
