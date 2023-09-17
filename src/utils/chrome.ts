import store from 'store';

export function sendMessage(data: { action, [key: string]: any }) {
  chrome.runtime.sendMessage(data);
}

export function listenMessageAction(onMessage: (message, sender, sendResponse) => {}) {
  chrome.runtime.onMessage.addListener(onMessage)
}

export async function storageGet(key) {
  if (!chrome || !chrome?.storage) {
    return store.get(key)
  }

  const resp: any = await chrome.storage.local.get(key)
  const data = resp?.[key];
  return data
}

export async function storageSet(key, value) {
  if (!chrome || !chrome?.storage) {
    return store.set(key, value)
  }

  return await chrome.storage.local.set({ [key]: value })
}

