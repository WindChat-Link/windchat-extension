
export const DEBUG = false;

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
  if (!id) return false;
  if (id === 'home') return false;

  const data = await chrome.storage.local.get(id);

  const active = !!data?.[id];
  console.log('active', active);
  return active;
}

export async function setActiveGroupId(id, active) {
  await chrome.storage.local.set({ [id]: active })
}
