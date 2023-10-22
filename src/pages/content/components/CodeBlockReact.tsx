
import { useRef, useEffect, useState } from 'react';
import { cn } from '../../../../utils/cn';
import { REACT_EDIT_PATH, REACT_PREVIEW_PATH } from '../config';
import LoadingBlock from '../../popup/popup/LoadingBlock';

export default function CodeBlockReact({
  hash, className = '', children = null,
}) {
  const frameRef = useRef<any>();
  const [loaded, setLoaded] = useState<any>(false);

  const previewPath = `${REACT_PREVIEW_PATH}#${hash}`
  const editPath = `${REACT_EDIT_PATH}#${hash}`
  const width = 600
  const height = 600

  useEffect(() => {
    if (frameRef.current) {
      var iframe = frameRef.current;
      iframe.onload = function () {
        setLoaded(true)
      };
    }
  }, [frameRef.current]);

  return <div className={cn('', className)}>
    {!loaded && <div className='flex flex-col ac jc py-10 tc'>
      <LoadingBlock height={'30px'}></LoadingBlock>
      This may take several seconds...
    </div>}
    <div className={cn(loaded ? 'opacity-1' : 'opacity-0')}>
      <iframe
        ref={frameRef}
        style={{ width, height }}
        src={previewPath}></iframe>
    </div>
  </div >;
}
