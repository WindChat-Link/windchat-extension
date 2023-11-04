import { useEffect } from 'react';
import { useInitStorage } from '../../utils/pstore';
import { observeAll } from './components/observeAll';
import { useStoreStates, StoreKeysMap } from '../../utils/zstore';

export default function App() {
  const [tabCodeList, setTabCodeList, updateTabCodeList] = useStoreStates(StoreKeysMap.tabCodeList);
  console.log('tabCodeList', tabCodeList);

  useEffect(() => {
    observeAll()
    setTimeout(() => {
      setTabCodeList({ a: 'a' })
    }, 1000);
  }, []);

  return <div className=''>
  </div>;
}



