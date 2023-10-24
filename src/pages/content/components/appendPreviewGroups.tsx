import _ from 'lodash';
import { MODE } from '../config';
import { addClass, hasClass } from '../utils';
import { appendOneGroup } from './appendOneGroup';
import { getGroups, groupsPreviewBlocksLoadedClassName } from './appendPreviewBlocks';
import { isVip } from './isVip';

const maxGroups = 5;

export const appendPreviewGroups = _.throttle(appendPreviewGroups0, 1000, { leading: true, trailing: true });

export async function appendPreviewGroups0({ mode = MODE.tailwind } = {}) {

  let chatGroups = Array.from(getGroups());
  const totalCount = chatGroups.length;

  const vip = await isVip();
  const buyIndex = totalCount - maxGroups;

  for (let index = chatGroups.length - 1; index > 0; index--) {
    const group = chatGroups[index];
    const groupLoaded = hasClass(group, groupsPreviewBlocksLoadedClassName)

    if (groupLoaded) {
      continue;
    }
    addClass(group, groupsPreviewBlocksLoadedClassName)

    if (index > buyIndex || vip) {
      appendOneGroup({
        index,
        group, mode,
      })
    } else {
      if (index === buyIndex) {
        appendOneGroup({
          index,
          group, mode,
          buy: true
        })
      } else if (index < buyIndex) return;
    }
  }

}



