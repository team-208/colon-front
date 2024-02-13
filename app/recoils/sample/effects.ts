interface Storage {
  Session: 'session';
  Local: 'local';
}

export const storageEffect =
  (type: Storage[keyof Storage], key: string) =>
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
