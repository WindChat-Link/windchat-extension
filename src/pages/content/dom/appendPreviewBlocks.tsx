import { MODE } from '../config';
import { getGroups } from '../initLoad';
import { hasClass } from '../utils';
import { previewBlockAddedClass } from './codeBlockConfig';
import { appendOneGroup } from './appendOneGroup';

/** 
 * Group
 */
export const groupStyles = {
  display: 'flex',
  gap: '0',
  alignItems: 'stretch',
  paddingRight: '10px',
  paddingLeft: '10px',
}


/** 
 * Preview Block
 */
export const previewBlockClass = 'thp-preview-block';
export const groupFindBlocksClassName = 'text-base'
export const iframeBlockClass = 'thp-iframe-block';
export const previewToolbarClass = 'thp-preview-toolbar';

export const answerBlockStyle = {
  marginRight: 0,
  marginLeft: '0',
}

export const previewBlockStyle = {
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  overflowY: 'auto',
  position: 'sticky',
  maxHeight: '76vh',
  top: '61px',
  alignSelf: 'stretch',
}

export function appendPreviewBlocks({ mode = MODE.tailwind, last = false } = {}) {
  console.log('\n\n%c--------- renderPreviewBlocks ---------', 'background:yellow; color:blue; font-weight:600;');
  console.log('last', last);

  let chatGroups = Array.from(getGroups()).reverse();

  if (last) {
    chatGroups = chatGroups.slice(0, 1)
  }

  for (let index = 0; index < chatGroups.length; index++) {
    const group = chatGroups[index];
    const groupLoaded = hasClass(group, previewBlockAddedClass)

    if (last) {
      const existPreviewBlock = group.querySelector(`.${previewBlockAddedClass}`)
      if (existPreviewBlock) {
        group.removeChild(existPreviewBlock);
      }
    } else {
      if (groupLoaded) {
        continue;
      }
    }

    appendOneGroup({
      index,
      group, mode,
    })
  }
}



