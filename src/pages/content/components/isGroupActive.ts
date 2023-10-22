
const DEBUG = false;

export function log(...v) {
  if (DEBUG) {
    console.log(...v);
  }
}

export function getGroupId() {
  const pathname = window.location.pathname;
  const id = pathname.split('/')?.[2];
  if (pathname === '/') {
    return 'home';
  }

  return id;
}


export async function isGroupActive() {
  const id = getGroupId();
  // if (DEBUG_ALL_ENABLE) return true;
  if (!id) return false;

  const data = await chrome.storage.local.get(id);

  const active = !!data?.[id];
  return active;
}

export async function setActiveGroupId(id, active) {
  await chrome.storage.local.set({ [id]: active })
}
