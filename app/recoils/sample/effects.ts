import { RecoilStorage, RecoilStorageKey, RECOIL_STORAGE_KEYS } from './key.d';

export const storageEffect =
  (type: RecoilStorage[keyof RecoilStorage], key: RecoilStorageKey[keyof RecoilStorageKey]) =>
  ({ setSelf, onSet }: any) => {
    if (typeof window === 'undefined') return;

    const savedValue = window[`${type}Storage`].getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? window[`${type}Storage`].removeItem(key)
        : window[`${type}Storage`].setItem(key, JSON.stringify(newValue));
    });
  };
