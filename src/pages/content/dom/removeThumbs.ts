import { addClass, addStyle, hasClass } from '../utils';

/** 
 * Thumb
 */

export const thumbBlocksSelector = '.flex.justify-between .text-gray-400.self-end';
export const thumbBlocksSelectorAdded = 'thumbBlocksSelectorAdded';

export function removeThumbs() {
  const blocks = document.querySelectorAll(thumbBlocksSelector);

  for (const block of blocks) {
    if (hasClass(block, thumbBlocksSelectorAdded)) continue;

    if (block?.parentNode) {
      addStyle(block?.parentNode, {
        width: 0, height: 0, visible: false, display: 'none'
      });
    }
    addClass(block, thumbBlocksSelectorAdded)
  }
}
