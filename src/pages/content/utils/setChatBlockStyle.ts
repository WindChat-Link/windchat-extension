import { log } from '../initLoad';
import { addStyle, hasClass } from '../utils';


/** 
 * Chat Block
 */
const blocksSelector = '.group .flex.gap-4.text-base';

export const chatBlockClass = 'thp-chat-block';

export const chatBlockStyle = {
  marginLeft: '10px',
  width: '660px',
  // minWidth: '500px'
}

export const chatBlockInnerClass = 'relative';
export const chatBlockInnerStyle = {
  width: '100%'
}

export function getChatBlocks() {
  const chatBlocks = document.querySelectorAll(blocksSelector) as NodeListOf<HTMLElement>;
  return chatBlocks
}

export function setChatBlockStyle() {
  log('\n\n%c--------- setChatBlockStyle ---------', 'background:yellow; color:blue; font-weight:600;');

  const chatBlocks = getChatBlocks();

  for (const block of chatBlocks) {
    if (hasClass(block, chatBlockClass)) continue;

    block.classList.remove('m-auto');
    block.classList.add(chatBlockClass);

    addStyle(block, chatBlockStyle);
    const children = block?.childNodes;
    for (const node of children) {
      if (hasClass(node, chatBlockInnerClass)) {
        addStyle(node, chatBlockInnerStyle);
      }
    }
  }
}
