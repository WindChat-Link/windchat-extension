import { useEffect } from 'react';
import { useInitStorage } from '../../utils/pstore';
import { observeAll } from './components/observeAll';

export default function App() {
  const storageInited = useInitStorage();

  useEffect(() => {
    observeAll()
  }, []);

  if (!storageInited) return null

  return <div className=''>
  </div>;
}



