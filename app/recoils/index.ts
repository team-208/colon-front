import { RecoilEnv } from 'recoil';
export * from './ui/atom';
export * from './header/atom';
export * from './tooltip/atom';

// HMR 때문에 개발시 다시 빌드되면서 고유해야 하는 atom key가 똑같은 값으로 재생성되어
// Duplicate atom key 에러문구가 콘솔창에 발생하는 것을 처리하는 로직
if (process.env.NODE_ENV === 'development')
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
