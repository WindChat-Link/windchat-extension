import { log, getGroups, isVip } from '../initLoad';
import { addStyle, hasClass } from '../utils';
import { codeBlockClass, codeBlockStyles } from './appendCodeBlocks';
import { appendFrame } from './appendFrame';
import { groupFindBlocksClassName } from '../components/renderPreviewBlocks';
import { getCodeListOfBlock } from './getCodeListOfBlock';
import { Mode } from '../config';


export async function appendCodeLastChat(mode = Mode.tailwind) {

  let groups = Array.from(getGroups()).reverse();

  const group = groups[0];
  const blocks = group.getElementsByClassName(groupFindBlocksClassName);
  const block = blocks?.[0] as HTMLElement;
  const previewBlock = group.getElementsByClassName(codeBlockClass)?.[0] as HTMLElement;
  console.log('previewBlock', previewBlock);

  if (block && previewBlock) {
    previewBlock.innerHTML = '';

    const codeList = getCodeListOfBlock(block);
    let hasCode = false;
    for (const code of codeList) {
      console.log('code', code);
      if (mode === Mode.tailwind) {
        const codeBlock = document.createElement('code');

        addStyle(codeBlock, codeBlockStyles);

        codeBlock.innerHTML = code;
        previewBlock.appendChild(codeBlock);
      } else {
        const frameBlock = appendFrame({ code })
        previewBlock.appendChild(frameBlock);
      }
      hasCode = true;
    }
  }

  // previewBlock.classList.add(codeAddedClass);

}
