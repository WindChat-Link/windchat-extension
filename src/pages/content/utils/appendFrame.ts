import { commentOutImports } from './commentOutImports';
import { REACT_EDIT_PATH, REACT_PREVIEW_PATH } from '../config';
import { hashCode } from './urlHash';

export function appendFrame({ code: code0 }) {
  let code = commentOutImports(code0)
  console.log('code', code);

  const frameBlock = document.createElement('div');
  const hash = code ? hashCode(code) : ''
  const previewPath = `${REACT_PREVIEW_PATH}#${hash}`
  const editPath = `${REACT_EDIT_PATH}#${hash}`

  const newWindowButton = `<a href="${previewPath}" target="_blank" 
  class='text-sm border hover:border-indigo-500 border-indigo-600 text-indigo-600 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100  rounded gap-2'
  style="display:inline-block;padding:2px 6px;margin:10px 5px 10px 0;"
  >Fullscreen
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-indigo-600 pb-1 relative inline-block w-5 h-5">
<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
</a>
`
  const editButton = `
<a href="${editPath}" target="_blank" 
              class='text-sm border hover:border-indigo-500 border-indigo-600 text-indigo-600 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100  rounded gap-2'
              style="display:inline-block;padding:2px 6px;margin:10px 5px 10px 0;"
              >Edit code 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-indigo-600 pb-1 relative inline-block w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            </a>
`

  frameBlock.innerHTML = `
              <iframe 
              style="border:1px solid rgba(0,0,0,0.3);border-radius:4px; width:720px; height:600px;"
              src="${previewPath}"></iframe>
              <div class='flex gap-2'>
${newWindowButton}
${editButton}
              </div>
              `
  return frameBlock
}
