import store from 'store';

export async function getStorageAll() {
  const data = await chrome.storage.local.get(null)
  return data
}

export async function clearAllStorage() {
  const all = getStorageAll()
  const keys = Object.keys(all);
  for (const key of keys) {
    if (chrome.storage) {
      await chrome.storage.local.remove(key)
    } else {
      await store.remove(key)
    }
  }
}

export async function getStorage(key) {
  if (chrome?.storage) {
    const resp: any = await chrome.storage.local.get(key)
    const data = resp?.[key];
    return data
  } else {
    return store.get(key)
  }
}

export async function setStorage(key, value) {
  if (chrome?.storage) {
    return chrome.storage.local.set({ [key]: value })
  } else {
    return store.set(key, value)
  }
}

export async function getStorageWithDefault(key, defaultValue) {
  const val = await getStorage(key)
  if (typeof val !== 'undefined') {
    return val;
  } else return defaultValue;
}

export const licenseInfoKey = 'licenseInfo';
export const setInstanceListKey = 'instanceList';

export async function getLicenseInfoStorage() {
  const resp = await chrome.storage.local.get(licenseInfoKey);
  const data = resp?.[licenseInfoKey];
  return data;
}

export async function setLicenseInfoStorage(data) {
  await chrome.storage.local.set({ [licenseInfoKey]: data });
}

export async function setInstanceListStorage(data) {
  await chrome.storage.local.set({ [setInstanceListKey]: data });
}


export async function getInstanceListStorage(data) {
  await chrome.storage.local.set({ [setInstanceListKey]: data });
}
