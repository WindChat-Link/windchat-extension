import { useEffect } from 'react';
import { useInitStorage } from '../../utils/pstore';
import { observeAll } from './components/observeAll';
import { useStoreStates, StoreKeysMap } from '../../utils/zstore';

export default function App() {
  const [tabCodeList, setTabCodeList, updateTabCodeList] = useStoreStates(StoreKeysMap.tabCodeList);
  console.log('tabCodeList', tabCodeList);
  console.log('setTabCodeList', setTabCodeList);

  useEffect(() => {
    observeAll()
    setTimeout(() => {
      setTabCodeList({ a: 'a' })
    }, 3000);
    setTimeout(() => {
      
    }, 2000);
  }, []);

  return <div className=''>
  </div>;
}



