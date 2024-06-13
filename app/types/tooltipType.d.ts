export interface TooltipTypes {
  tooltipProps: {
    contents: BasicType
  };
}

export interface TooltipRecoilStateProps extends TooltipTypes {
  visible: boolean;
}
