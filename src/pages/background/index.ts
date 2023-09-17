import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { getStorageAll } from '../../utils/storage';
import initOnConnect from './initOnConnect';
import initMessages from './initMessages';
import api from '@/api-swagger';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

initOnConnect()

initMessages()

getStorageAll()

const AppActiveKey = 'app_active';
const licenseInfoKey = 'licenseInfo';

async function getLicenseInfo() {
  const resp = await chrome.storage.local.get(licenseInfoKey);
  const data = resp?.[licenseInfoKey];
  return data;
}

async function setLicenseInfo(data) {
  await chrome.storage.local.set({ [licenseInfoKey]: data });
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === AppActiveKey) {
    chrome.storage.local.set({ [AppActiveKey]: message.active });
  }
});

async function checkValid() {
console.log('\n%c--------- checkValid --------- \n', 'background:yellow; color:blue; font-weight:600;');

  const licenseInfo = await getLicenseInfo()

  const email = licenseInfo?.email;
  console.log('email', email);
  const token = licenseInfo?.token;
  console.log('token', token);
  const licenseKey = licenseInfo?.licenseKey;
  console.log('licenseKey', licenseKey);
  const instanceId = licenseInfo?.instanceId;
  console.log('instanceId', instanceId);

  if (!email || !token || !licenseKey || !instanceId) {
    const toSave = {
      ...licenseInfo,
      valid: false
    }
    setLicenseInfo(toSave)
    return
  }

  try {
    console.log('\n%c--------- keyInstanceControllerCheck --------- \n', 'background:yellow; color:blue; font-weight:600;');
    const resp = await api.keyInstance.keyInstanceControllerCheck({
      email,
      token,
      licenseKey,
      instanceId,
    })
    const data = await resp?.json();
    console.log('data', data);
    const valid = data?.valid;
    const newToken = data?.token;
    if (!valid) {
      setLicenseInfo({
        ...licenseInfo,
        valid: false
      })
    } else if (valid && newToken) {
      setLicenseInfo({
        ...licenseInfo,
        token: newToken
      })
    } else if (valid) {
      setLicenseInfo({
        ...licenseInfo,
        valid: true
      })
    }
  } catch (error: any) {
    console.log('error', error);
  }
}

const viteAppEnv = import.meta.env.VITE_APPENV;
const isDev = viteAppEnv === 'development' || viteAppEnv === 'local';

const time = 4 * 3600 * 1000;

checkValid()

setInterval(() => {
  checkValid()
}, time)
