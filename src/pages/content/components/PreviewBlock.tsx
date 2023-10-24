import RenderIfVisible from 'react-render-if-visible';
import { cn } from '../../../../utils/cn';
import { MODE, lazyRenderMax } from '../config';
import { CodeBlock } from './CodeBlock';
import { useStoreStates, StoreKeysMap } from '../../../utils/zstore';
import { useEffect, useState } from 'react';
import { getGroupId } from './isGroupActive';

export const languageModeMap = {
  'html': MODE.tailwind,
  'php': MODE.tailwind,
  'php-template': MODE.tailwind,

}
export function getModeFromLanguage(lang) {
  return languageModeMap[lang] || MODE.react;
}

export default function PreviewBlock({ groupIndex, codeList: codeList0, className = '', children = null, }) {
  const [codeList, setCodeList] = useState<any>(codeList0);

  function listenStorage() {
    const groupId = getGroupId()
    chrome.storage.local.onChanged.addListener((changes) => {
      const indexKey = `${groupId}_${groupIndex}`
      const val = changes[indexKey]
      if (val) {
        const newVal = val?.newValue;
        setCodeList(newVal)
      }
    });
  }

  useEffect(() => {
    listenStorage()
  }, []);

  console.log('codeList', codeList);

  return <div
    className={cn(`min-h-[200px] max-h-[60vh] w-full`,)}
  >
    <div className='whitespace-pre-wrap'>groupIndex {JSON.stringify(groupIndex, null, 2)}</div>
    {
      codeList.map((item) => {
        if (groupIndex <= lazyRenderMax) {
          return <CodeBlock language={item.language} code={item.code}></CodeBlock>
        } else {
          return <RenderIfVisible>
            <CodeBlock language={item.language} code={item.code}></CodeBlock>
          </RenderIfVisible>
        }
      })
    }
  </div>;
}

