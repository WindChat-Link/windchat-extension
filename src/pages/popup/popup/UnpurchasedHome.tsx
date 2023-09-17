import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { pricingData } from './pricingData';

export function UnpurchasedHome() {
  function onClick(href) {
    window.open(href)
  }

  return <div className=''>
    <div className='mt-4 text-[16px] mb-3'>
      Unlock all features, <Link className={`text-indigo-600`} target='_blank' to='https://windchat.link#pricing'>view details</Link>
    </div>
    <div className='flex gap-2'>
      {pricingData.tiers.map((tier) => (
        <a target='_blank' href={tier.href} key={tier.title} className='no-underline'>
          <Button type='primary' ghost className={`w-[80px] px-0`}>
            {tier.price}
          </Button>
          <div className='text-indigo-600 no-underline mt-1 text-center'>
            {tier.frequencyText}
          </div>
        </a>
      ))}
    </div>
    <div className=' text-[16px] mt-4 mb-3'>
      Already purchased?
    </div>

    <Link to='/settings' className={`mt-2`}>
      <Button ghost type='primary'>Input LicenseKey</Button>
    </Link>
  </div>;
}
