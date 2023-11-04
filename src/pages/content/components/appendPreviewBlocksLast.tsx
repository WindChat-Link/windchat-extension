import { codeBlockTailwindClassName } from '../components/CodeBlockTailwind';
import { MODE } from '../config';
import { addClass, addStyle, hasClass } from '../utils';
import { appendOneGroup } from './appendOneGroup';
import { answerBlockStyle, getGroups, previewBlockStyle, previewToolbarClass } from './appendPreviewBlocks';
import { previewBlockAddedClass } from './codeBlockConfig';
import { getCodeListOfBlock } from './getCodeListOfBlock';
import _ from 'lodash';
import { getGroupId } from './isGroupActive';


// 如果直接删除group 再创建，会导致高度变化而闪烁
export function appendPreviewBlocksLast({ mode = MODE.tailwind } = {}) {
  console.log('\n\n%c--------- appendPreviewBlocksLast ---------', 'background:yellow; color:blue; font-weight:600;');
  const groupId = getGroupId();
  const allGroups = Array.from(getGroups())
  const lastIndex = allGroups.length - 1;

  // comment: 只处理最后一组
  const chatGroups = allGroups.slice(-1)
  const group = _.last(chatGroups)

  const existPreviewBlock = group.querySelector(`.${previewBlockAddedClass}`)
  if (existPreviewBlock) {
    const answerBlock = group.querySelector('div:first-child');
    if (answerBlock) {
      addStyle(answerBlock, answerBlockStyle);
    }
    const codeList = getCodeListOfBlock(answerBlock, mode);
    const codeBlocks = group.querySelectorAll(`.${codeBlockTailwindClassName}`)
    if (mode === MODE.tailwind && codeBlocks.length === codeList.length) {
      for (let index = 0; index < codeBlocks.length; index++) {
        const codeBlock = codeBlocks[index];
        codeBlock.innerHTML = codeList[index]?.code;
      }
      return;
    } else {
      chrome.storage.local.set({
        [`${groupId}_${lastIndex}`]: codeList
      });

      // react 模式暂时删除重建
      // codeBlocks数量不一致，删除重建
      // group.removeChild(existPreviewBlock);
      // appendOneGroup({
      //   index: chatGroups.length,
      //   group, mode,
      // })
    }
  } else {
    appendOneGroup({
      index: allGroups.length - 1,
      group, mode,
    })
  }
}



