import store from 'store';
import { create } from 'zustand';

export async function getStorageChrome(key, defaultValue) {
  if (chrome?.storage) {
    const resp: any = await chrome.storage.local.get(key)
    const data = resp?.[key];
    return data || defaultValue
  } else {
    return store.get(key) || defaultValue
  }
}

export function setStorageChrome(key, value) {
  if (chrome?.storage) {
    return chrome.storage.local.set({ [key]: value })
  } else {
    return store.set(key, value)
  }
}

export async function getStorageAllChrome() {
  const data = await chrome.storage.local.get(null)
  return data
}

export async function clearAllStorageChrome() {
  const all = getStorageAllChrome()
  const keys = Object.keys(all);
  for (const key of keys) {
    if (chrome.storage) {
      await chrome.storage.local.remove(key)
    } else {
      await store.remove(key)
    }
  }
}

export function getStorage(key, defaultValue) {
  return store.get(key) || defaultValue;
}

export function setStorage(key, value) { return store.set(key, value); }

const StateDefault = {
  state: 0,
  tabCodeList: {},
};

let StorageDefault = {
  loginInfo: { name: 'userName1' },
  settings: {
    showSummary: true,
    showTime: true,
    summaryClamp: 2,
  },
};

const StorageKeys = Object.keys(StorageDefault) as (keyof typeof StorageDefault)[];
let storageInited = false;

async function initStorage() {
  for (let index = 0; index < StorageKeys.length; index++) {
    const key = StorageKeys[index];
    StorageDefault[key] = await getStorageChrome(key, StorageDefault[key])
  }
  storageInited = true
}

const AllStateDefault = { ...StateDefault, ...StorageDefault }

export type StoreKeyType = keyof typeof AllStateDefault;

const StoreKeysList: StoreKeyType[] = Object.keys({
  ...StateDefault,
  ...StorageDefault,
}) as StoreKeyType[];

export const StoreKeysMap = StoreKeysList.reduce((acc, key) => ({ ...acc, [key]: key, }), {} as { [K in StoreKeyType]: K });

function needSaveStorage(key) {
  return (StorageKeys as StoreKeyType[]).includes(key)
}

export const useBearStore = create(async (set) => {
  if (!storageInited) {
    await initStorage()
  }

  return {
    ...Object.keys(AllStateDefault).reduce((acc, key: StoreKeyType) => {
      const setKey = `set${key[0].toUpperCase()}${key.slice(1)}`
      const updateKey = `update${key[0].toUpperCase()}${key.slice(1)}`
      return {
        ...acc,
        [key]: StorageDefault[key],
        [setKey]: (value) => {
          set({ [key]: value });
          if (needSaveStorage(key)) {
            setStorageChrome(key, value)
          }
        },
        [updateKey]: (values) => {
          set(state => {
            const newValues = { ...state[key], ...values }
            if (needSaveStorage(key)) {
              setStorageChrome(key, newValues)
            }
            return { [key]: newValues };
          });
        },
      };
    }, {}),
    increaseBears: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }
});

type StateSetter<T> = (value: T) => void;
type StateUpdater<T> = (values: Partial<T>) => void;

export function useStoreStates<K extends keyof typeof AllStateDefault>(key: K): [
  typeof AllStateDefault[K],
  StateSetter<typeof AllStateDefault[K]>,
  StateUpdater<typeof AllStateDefault[K]>
] {
  const setKey = `set${key[0].toUpperCase()}${key.slice(1)}` as const;
  const updateKey = `update${key[0].toUpperCase()}${key.slice(1)}` as const;

  const [keyValue, setKeyValue, updateKeyValue] = useBearStore((state: any) => {
    return [
      state?.[key],
      state?.[setKey],
      state?.[updateKey],
    ]
  });

  return [
    keyValue as typeof AllStateDefault[K],
    setKeyValue as StateSetter<typeof AllStateDefault[K]>,
    updateKeyValue as StateUpdater<typeof AllStateDefault[K]>
  ];
}
