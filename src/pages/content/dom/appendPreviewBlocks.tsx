import { MODE } from '../config';
import { hasClass } from '../utils';
import { appendOneGroup } from './appendOneGroup';
import { previewBlockAddedClass } from './codeBlockConfig';

/** 
 * Group
 */
const answerGroupsSelector = '.group.w-full.bg-gray-50';

export function getGroups() {
  const chatGroups = document.querySelectorAll(answerGroupsSelector) as NodeListOf<HTMLElement>;
  return chatGroups;
}

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

export function appendPreviewBlocks({ mode = MODE.tailwind } = {}) {
  console.log('\n\n%c--------- appendPreviewBlocks ---------', 'background:yellow; color:blue; font-weight:600;');

  let chatGroups = Array.from(getGroups())

  for (let index = 0; index < chatGroups.length; index++) {
    const group = chatGroups[index];
    const groupLoaded = hasClass(group, previewBlockAddedClass)

    if (groupLoaded) {
      continue;
    }

    appendOneGroup({
      index,
      group, mode,
    })
  }
}



