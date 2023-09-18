import { log, thumbBlocksSelector, thumbBlocksSelectorAdded } from '../initLoad';
import { addClass, addStyle, hasClass } from '../utils';

export function removeThumbs() {
  log('\n\n%c--------- removeThumbs ---------', 'background:yellow; color:blue; font-weight:600;');

  const blocks = document.querySelectorAll(thumbBlocksSelector);
  log('removeThumbs blocks.length', blocks.length);

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
