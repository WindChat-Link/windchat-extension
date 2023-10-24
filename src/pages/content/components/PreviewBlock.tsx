import RenderIfVisible from 'react-render-if-visible';
import { cn } from '../../../../utils/cn';
import { MODE, lazyRenderMax } from '../config';
import { CodeBlock } from './CodeBlock';
import { useStoreStates, StoreKeysMap } from '../../../utils/zstore';
import { useEffect } from 'react';
import { getGroupId } from './isGroupActive';

const ESTIMATED_ITEM_HEIGHT = 600;

export const languageModeMap = {
  'html': MODE.tailwind,
  'php': MODE.tailwind,
  'php-template': MODE.tailwind,

}
export function getModeFromLanguage(lang) {
  return languageModeMap[lang] || MODE.react;
}

export default function PreviewBlock({ groupIndex, codeList, className = '', children = null, }) {
  const [tabCodeList, setTabCodeList, updateTabCodeList] = useStoreStates(StoreKeysMap.tabCodeList);
  console.log('\n\n%c--------- PreviewBlock ---------', 'background:yellow; color:blue; font-weight:600;');
  console.log('tabCodeList', tabCodeList);

  function listenStorage() {
    const groupId = getGroupId()
    console.log('\n\n%c--------- listenStorage ---------', 'background:yellow; color:blue; font-weight:600;');
    chrome.storage.local.onChanged.addListener((changes) => {
      console.log('\n\n%c--------- addListener ---------', 'background:yellow; color:blue; font-weight:600;');
      console.log('changes', changes);
      const indexKey = `${groupId}_${groupIndex}`
      console.log('groupIndex', groupIndex);
      console.log('indexKey', indexKey);
      if (changes[indexKey]) {
        console.log('changes[indexKey]', changes[indexKey]);
      }

      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
      }
    });
  }

  useEffect(() => {
    listenStorage()
  }, []);

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

