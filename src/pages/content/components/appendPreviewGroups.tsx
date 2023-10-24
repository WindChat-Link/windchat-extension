import _ from 'lodash';
import { MODE } from '../config';
import { addClass } from '../utils';
import { appendOneGroup } from './appendOneGroup';
import { getGroups, groupsPreviewBlocksLoadedClassName } from './appendPreviewBlocks';
import { isVip } from './isVip';
import group from 'antd/es/avatar/group';


const maxGroups = 5;

export const appendPreviewGroups = _.throttle(appendPreviewGroups0, 1000, { leading: true, trailing: true });

export async function appendPreviewGroups0({ mode = MODE.tailwind } = {}) {
  let chatGroups = Array.from(getGroups());

  const vip = await isVip();

  for (let index = chatGroups.length - 1; index > 0; index--) {
    const group = chatGroups[index];
    // @ts-ignore
    const groupLoaded = hasClass(group, groupsPreviewBlocksLoadedClassName)

    if (groupLoaded) {
      continue;
    }
    addClass(group, groupsPreviewBlocksLoadedClassName)

    if (index < maxGroups || vip) {
      appendOneGroup({
        index,
        group, mode,
      })
    } else {
      if (index === maxGroups) {
        appendOneGroup({
          index,
          group, mode,
          buy: true
        })
      } else if (index > maxGroups) return;
    }
  }

}



