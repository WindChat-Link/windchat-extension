
import { Tabs, message } from 'antd';
import { useState } from 'react';
import InstanceList from './InstanceList';
import LicenseForm from './LicenseForm';
import LicenseInfo from './LicenseInfo';
import { useLicenseInfo } from '../../../../utils/pstore';

export default function SettingsTabs() {
  const [reachLimit, setReachLimit] = useState<any>(false);
  const [tab, setTab] = useState<any>('form');
  const [licenseInfo, setLicenseInfo] = useLicenseInfo()
  const valid = licenseInfo?.valid;
  const [listTimekey, setListTimekey] = useState<any>(Date.now());

  async function onSuccess(data) {
    message.success('Activation successful, please refresh ChatGPT page');
    setReachLimit(false)
    setListTimekey(Date.now());
  }

  async function onReachLimit() {
    setReachLimit(true)
    setTimeout(() => {
      setTab('instances')
    }, 300);
  }

  return <div>
    <Tabs
      items={[
        {
          key: 'form',
          label: 'LicenseInfo',
          children: <div className='pt-2'>
            {valid ?
              <LicenseInfo></LicenseInfo> :
              <LicenseForm onSuccess={onSuccess}
                onReachLimit={onReachLimit}
              ></LicenseForm>
            }
          </div>
        },
        {
          key: 'instances',
          label: 'Activation',
          children: <InstanceList key={listTimekey}></InstanceList>
        }
      ]}
      activeKey={tab} onChange={(t) => setTab(t)}>
    </Tabs>
  </div >;
}
