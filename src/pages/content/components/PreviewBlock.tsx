import RenderIfVisible from 'react-render-if-visible';
import { cn } from '../../../../utils/cn';
import { Mode, lazyRenderMax } from '../config';
import { CodeBlock } from './CodeBlock';

const ESTIMATED_ITEM_HEIGHT = 600;

export default function PreviewBlock({ groupIndex, codeList, className = '', children = null, }) {
  const mode = Mode.react;

  return <div
    className={cn(`h-full w-full`,)}
  >
    {
      codeList.map((code) => {
        if (groupIndex <= lazyRenderMax) {
          return <CodeBlock mode={mode} code={code}></CodeBlock>
        } else {
          return <RenderIfVisible defaultHeight={ESTIMATED_ITEM_HEIGHT}>
            <CodeBlock mode={mode} code={code}></CodeBlock>
          </RenderIfVisible>
        }
      })

    }
  </div>;
}

