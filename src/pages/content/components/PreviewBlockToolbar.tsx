import { cn } from '../../../../utils/cn';
import Button from '../../components/Button';
import {
  MODE,
  REACT_EDIT_PATH,
  REACT_PREVIEW_PATH,
  TAILWIND_PREVIEW_PATH,
  previewWidth
} from '../config';
import ModeSwitch from './ModeSwitch';

export function PreviewBlockToolbar({ mode, setMode, hash }) {
  const previewPath = mode === MODE.tailwind ? `${TAILWIND_PREVIEW_PATH}#${hash}` : `${REACT_PREVIEW_PATH}#${hash}`;
  const editPath = `${REACT_EDIT_PATH}#${hash}`

  return <div
    style={{ minWidth: editPath }}
    className='min-w-[800px] overflpw-x-auto sticky top-0 shadow bg-white rounded gap-4 py-2 flex items-center px-3 h-[40px] mb-1'>
    <ModeSwitch
      mode={mode}
      setMode={setMode}
    ></ModeSwitch>


    <a href={previewPath} target="_blank"
      className={cn(`flex items-center`,)}
    >
      <Button type='outline' className={cn(`text-sm bg-white flex items-center gap-1`,)}>Fullscreen
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          className="text-indigo-600 relative inline-block w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      </Button>
    </a>

    {mode === MODE.react && <a href={editPath} target="_blank"
      className={cn(`flex items-center`,)}
    >
      <Button type='outline' className={cn(`text-sm bg-white  flex items-center gap-1`,)}>
        Edit code
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          className="text-indigo-600 relative inline-block w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </Button>
    </a>
    }


    <a href={`https://www.windchat.link/prompt`} target="_blank"
      className={cn(`flex items-center`,)}
    >
      <Button type='outline'
        className={cn(`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-sm text-white font-semibold flex items-center gap-1 border-indigo-500`,)}>
        Prompt Library
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className=" w-4 h-4 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      </Button>
    </a>
  </div>;
}
