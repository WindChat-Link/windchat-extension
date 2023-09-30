import { addClass, addStyle, hasClass } from '../utils';

/** 
 * Avatar
 */
export const avatarSelector = '.flex.flex-col.relative.items-end'
export const avatarSelectorAdded = 'avatarSelectorAdded'

export function removeAvatar() {
  const eles = document.querySelectorAll(avatarSelector);

  for (const ele of eles) {
    if (hasClass(ele, avatarSelectorAdded)) continue;

    addStyle(ele, {
      width: 0, height: 0, visible: false, display: 'none'
    });
    addClass(ele, avatarSelectorAdded)
  }
}
