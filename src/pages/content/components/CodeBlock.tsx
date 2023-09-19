import { commentOutImports } from '../utils/commentOutImports';
import { MODE, previewWidth } from '../config';
import { hashCode } from '../utils/urlHash';
import CodeBlockReact from './CodeBlockReact';
import CodeBlockTailwind from './CodeBlockTailwind';
import { PreviewBlockToolbar } from './PreviewBlockToolbar';
import { getModeFromLanguage } from './PreviewBlock';
import { useState } from 'react';

export function CodeBlock({ language, code }) {
  let code2 = commentOutImports(code)
  const hash = code ? hashCode(code2) : ''
  const initMode = getModeFromLanguage(language)
  console.log('initMode', initMode);
  const [mode, setMode] = useState<any>(initMode);

  return <div className='h-full flex flex-col justify-stretch'>
    <PreviewBlockToolbar
      mode={mode}
      hash={hash}
    ></PreviewBlockToolbar>
    <div
      style={{ minWidth: previewWidth }}
      className='px-3 py-3 bg-white mt-1 shadow rounded flex-1'>
      {mode === MODE.tailwind &&
        <CodeBlockTailwind code={code}></CodeBlockTailwind>
      }
      {mode === MODE.react &&
        <CodeBlockReact hash={hash}></CodeBlockReact>
      }
    </div>
  </div >;
}

