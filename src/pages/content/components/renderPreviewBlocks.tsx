import { createRoot } from 'react-dom/client';
import PreviewBlock from './PreviewBlock';
import { hasClass, addStyle, addClass } from '../utils';
import { previewBlockAddedClass, codeBlockClass, codeBlockStyles } from '../utils/appendCodeBlocks';
import { getGroups } from '../initLoad';
import { appendFrame } from '../utils/appendFrame';
import { getCodeListOfBlock } from '../utils/getCodeListOfBlock';
import { Mode } from '../config';

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
  marginRight: '0',
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

export function renderPreviewBlocks({ mode = Mode.tailwind, last = false } = {}) {
  console.log('\n\n%c--------- renderPreviewBlocks ---------', 'background:yellow; color:blue; font-weight:600;');

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

    renderOneGroup({
      index,
      group, mode,
    })
  }
}


export function renderOneGroup({ index, group, mode = Mode.tailwind, }) {
  addStyle(group, groupStyles);

  const previewCodeBlock = document.createElement('div');
  // 要先移除 model 提示 block
  const modelUnavailableBlock = group.querySelector('div.text-center.text-xs')
  if (modelUnavailableBlock) {
    group.removeChild(modelUnavailableBlock)
  }

  const answerBlock = group.querySelector('div:first-child')
  if (answerBlock) {
    addStyle(answerBlock, answerBlockStyle)
  }

  addClass(previewCodeBlock, previewBlockAddedClass)
  addClass(previewCodeBlock, previewToolbarClass)
  addStyle(previewCodeBlock, previewBlockStyle)
  addClass(previewCodeBlock, 'relative')

  const codeList = getCodeListOfBlock(answerBlock, mode);

  createRoot(previewCodeBlock).render(
    <PreviewBlock groupIndex={index} codeList={codeList}></PreviewBlock>
  );

  group.append(previewCodeBlock);
}
