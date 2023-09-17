import { isDev } from '../../../config';

export function key2() {
  return ``
};

function Header() {
  const img = chrome && chrome?.runtime ? chrome.runtime.getURL('128.png') : '';
  return <div className={``}>
    <div className={`relative flex mt-4 ac gap-3 mb-1 text-indigo-600 text-4xl font-semibold`}>
      {img ? <img className={`w-10 h-10`} src={img} alt="" /> : null} WindChat
      {isDev ? <div className='text-gray-500 text-sm absolute right-0 top-3'>
        DEV
      </div> : null}
    </div>
  </div>
}

export default Header;
