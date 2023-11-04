import { DEBUG_ALL_ENABLE } from '../config';


export async function isVip() {
  const resp = await chrome.storage.local.get('licenseInfo');
  const data = resp?.licenseInfo;
  const valid = data?.valid;
  if (DEBUG_ALL_ENABLE) {
    return true;
  }
  return !!valid;
}
