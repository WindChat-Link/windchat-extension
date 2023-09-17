import Header from './Header';
import SettingsTabs from './settings/SettingsTabs';

export function key2() {
  return ``
};
function Version() {
  var manifestData: any = chrome && chrome?.runtime ? chrome.runtime.getManifest() : {};
  const version = manifestData?.version || '';

  return <div className='text-[12px] font-light italic text-gray-500'>
    Version: {version}
  </div>
}

function Settings() {

  return <div className={`flex fdc h-full`}>
    <Header></Header>
    <SettingsTabs></SettingsTabs>
  </div>
}
export default Settings
