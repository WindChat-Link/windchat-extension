import RenderIfVisible from 'react-render-if-visible';
import { cn } from '../../../../utils/cn';
import { MODE, lazyRenderMax } from '../config';
import { CodeBlock } from './CodeBlock';

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

  return <div
    className={cn(`min-h-[200px] max-h-[60vh] w-full`,)}
  >
    {
      codeList.map((item) => {
        if (groupIndex <= lazyRenderMax) {
          return <CodeBlock language={item.language} code={item.code}></CodeBlock>
        } else {
          return <RenderIfVisible defaultHeight={ESTIMATED_ITEM_HEIGHT}>
            <CodeBlock language={item.language} code={item.code}></CodeBlock>
          </RenderIfVisible>
        }
      })

    }
  </div>;
}

