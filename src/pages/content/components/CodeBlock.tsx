import { commentOutImports } from '../utils/commentOutImports';
import { MODE, previewWidth } from '../config';
import { hashCode } from '../utils/urlHash';
import CodeBlockReact from './CodeBlockReact';
import CodeBlockTailwind from './CodeBlockTailwind';
import { PreviewBlockToolbar } from './PreviewBlockToolbar';

export function CodeBlock({ mode, code }) {
  let code2 = commentOutImports(code)
  const hash = code ? hashCode(code2) : ''

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

