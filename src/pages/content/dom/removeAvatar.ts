import { log, avatarSelector, avatarSelectorAdded } from '../initLoad';
import { addClass, addStyle, hasClass } from '../utils';

export function removeAvatar() {
  log('\n\n%c--------- removeAvatar ---------', 'background:yellow; color:blue; font-weight:600;');

  const eles = document.querySelectorAll(avatarSelector);
  log('eles.length', eles.length);

  for (const ele of eles) {
    if (hasClass(ele, avatarSelectorAdded)) continue;

    addStyle(ele, {
      width: 0, height: 0, visible: false, display: 'none'
    });
    addClass(ele, avatarSelectorAdded)
  }
}
