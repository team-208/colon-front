interface RecoilKeyProps {
  scrollState: string;
  mobileScreenState: string;
  modalState: string;
  mypageHeaderState: string;
  writeHeaderState: string;
  tooltipState: string;
}

const RECOIL_KEYS: RecoilKeyProps = {
  scrollState: 'scrollState',
  mobileScreenState: 'mobileScreenState',
  modalState: 'modalState',
  mypageHeaderState: 'mypageHeaderState',
  writeHeaderState: 'writeHeaderState',
  tooltipState: 'tooltipState',
};

export {
  // keys
  RECOIL_KEYS,
};
