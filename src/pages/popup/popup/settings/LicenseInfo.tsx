import { useLicenseInfo } from '../../../../utils/pstore';

export default function LicenseInfo() {
  const [licenseInfo, setLicenseInfo] = useLicenseInfo()
  const email = licenseInfo.email;
  const licenseKey = licenseInfo?.licenseKey;
  const instanceId = licenseInfo?.instanceId;
  const activationUsage = licenseInfo?.activationUsage;
  const activationLimit = licenseInfo?.activationLimit;

  return <div className={`mt-2`}>
    <div className=''>
      Email: {email.slice(0, 2)}**@***
    </div>
    <div className=''>
      LicenseKey: {licenseKey?.split('-')[0]}-***
    </div>
    <div className=''>
      Status: <span className='text-indigo-600'>
        Activated
      </span>
    </div>
  </div>;
}
