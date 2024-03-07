interface RecoilKeyProps {
  userState: string;
  userTagText: string;
}

interface RecoilSessionStorageKeyProps {
  userInfo: string;
}

export const RECOIL_KEYS: RecoilKeyProps = {
  userState: 'userState',
  userTagText: 'userTagText',
};

export const RECOIL_STORAGE_KEYS: RecoilSessionStorageKeyProps = {
  userInfo: 'user_info',
};

