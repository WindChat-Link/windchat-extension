import { Button } from 'antd';
import api from '../../../api-swagger';
import { isDev } from '../../../config';
import { useLicenseInfo } from '../../../utils/pstore';
import Header from './Header';
import { UnpurchasedHome } from './UnpurchasedHome';
import LicenseActivated from './settings/LicenseActivated';
import { getLicenseInfoStorage, setLicenseInfoStorage, setInstanceListStorage } from '../../../utils/storage';

async function check() {
  const licenseInfo = await getLicenseInfoStorage()

  const email = licenseInfo?.email;
  const token = licenseInfo?.token;
  const licenseKey = licenseInfo?.licenseKey;
  const instanceId = licenseInfo?.instanceId;

  try {
    const resp = await api.keyInstance.keyInstanceControllerCheck({
      email,
      token,
      licenseKey,
      instanceId,
    })

    const data = await resp?.json();
    alert(JSON.stringify(data))

    const valid = data?.valid;
    const newToken = data?.token;
    if (!valid) {
      setLicenseInfoStorage({
        ...licenseInfo,
        valid: false
      })
    } else if (valid && newToken) {
      setLicenseInfoStorage({
        ...licenseInfo,
        token: newToken
      })
    } else if (valid) {
      setLicenseInfoStorage({
        ...licenseInfo,
        valid: true
      })
    }
  } catch (error: any) {
    console.log('error', error);
  }
}

async function clearStorage() {
  setLicenseInfoStorage({})
  setInstanceListStorage([])
}

function Home() {
  const [licenseInfo, setLicenseInfo] = useLicenseInfo()
  const valid = licenseInfo?.valid;

  return <div className={`relative h-full pb-[0px]`}>
    <Header></Header>
    <div className={`mt-3 mb-1 text-xs text-gray-600 italic`}>
      ChatGPT Tailwind CSS HTML Previewer
    </div>
    <a className={`decoration-none mb-3 block`} target='_blank' href="https://windchat.link">https://windchat.link</a>
    {valid ? <div className='flex jc mt-16'>
      <LicenseActivated ></LicenseActivated>
    </div> :
      <UnpurchasedHome></UnpurchasedHome>
    }

    {isDev ? <div className='flex ac jc py-4 gap-2'>
      <Button type='primary' onClick={check}>Check</Button>
      <Button type='primary' onClick={clearStorage}>Clear Storage</Button>
    </div> : null
    }

  </div>
}

export default Home;
