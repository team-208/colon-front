interface RecoilStorage {
  Session: 'session';
  Local: 'local';
}

interface RecoilStorageKey {
  userInfo: 'user_info';
}

interface RecoilKeyProps {
  userState: string;
  userTagText: string;
}

const RECOIL_KEYS: RecoilKeyProps = {
  userState: 'userState',
  userTagText: 'userTagText',
};

const RECOIL_STORAGE_KEYS: RecoilStorageKey = {
  userInfo: 'user_info',
};

export {
  // interface
  RecoilStorage,
  RecoilStorageKey,

  // key
  RECOIL_KEYS,
  RECOIL_STORAGE_KEYS,
};
