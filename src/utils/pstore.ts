import { Store as PullStateStore } from 'pullstate';
import store from 'store';
import { storageSet } from './chrome';
import { useEffect } from 'react';
import { getStorageWithDefault } from './storage';
import { MODE } from '../pages/content/config';

function getStorage(key, defaultValue) {
  const val = store.get(key);
  if (typeof val !== 'undefined') {
    return val;
  } else return defaultValue;
}

export enum PStoreKeys {
  storageInited = 'storageInited',
  licenseInfo = 'licenseInfo',
  instanceList = 'instanceList',
  lastChatCodeList = 'lastChatCodeList',
  mode = 'mode',
}

export interface IPStore {
  licenseInfo: any;
  instanceList: any;
  storageInited: any;
  mode: any;
}

export const PStore = new PullStateStore<IPStore>({
  storageInited: false,

  licenseInfo: getStorage(PStoreKeys.licenseInfo, {}),
  instanceList: getStorage(PStoreKeys.instanceList, []),
  mode: MODE.tailwind,
});


export const updateState = (key: PStoreKeys, value: any) => {
  PStore.update((s: IPStore) => {
    // @ts-ignore
    s[key] = { ...s[key], ...value };
  });
};

export const usePState = (key, saveStorage = false) => {
  const data = PStore.useState(s => s[key]);
  const setter = valueOrCallback => {
    if (typeof valueOrCallback === 'function') {
      PStore.update((s: IPStore) => {
        const state = PStore.getRawState();
        const oldValue = state[key]
        const newValue = valueOrCallback(oldValue)
        s[key] = newValue
        if (saveStorage) {
          store.set(key, newValue);
          storageSet(key, newValue)
        }
      })
    } else {
      PStore.update((s: IPStore) => {
        s[key] = valueOrCallback;
      });
      if (saveStorage) {
        store.set(key, valueOrCallback);
        storageSet(key, valueOrCallback)
      }
    }
  };

  return [data, setter];
};

export const useLicenseInfo = () => {
  const saveStorage = true;
  const [value, setValue] = usePState(PStoreKeys.licenseInfo, saveStorage);
  return [value, setValue];
};


export const useInitStorage = () => {
  const [storageInited, setStorageInited] = useStorageInited()

  async function init() {
    const keys = Object.keys(PStoreKeys).filter(i => i !== PStoreKeys.storageInited)

    for (const key of keys) {
      const val = await getStorageWithDefault(PStoreKeys[key], undefined)
      if (typeof val !== 'undefined') {
        PStore.update((s: IPStore) => {
          s[key] = val;
        });
      }
    }
    setStorageInited(true)
  }

  useEffect(() => {
    init()
  }, []);
  return storageInited
};


export const useStorageInited = () => {
  const saveStorage = true;
  const [value, setValue] = usePState(PStoreKeys.storageInited, saveStorage);
  return [value, setValue];
};

export const useInstanceList = () => {
  const saveStorage = false;
  const [value, setValue] = usePState(PStoreKeys.instanceList, saveStorage);
  return [value, setValue];
};

export const useLastChatCodeList = () => {
  const saveStorage = false;
  const [value, setValue] = usePState(PStoreKeys.instanceList, saveStorage);
  return [value, setValue];
};

