import _ from 'lodash';
import { MODE } from '../config';
import { addClass, hasClass } from '../utils';
import { appendOneGroup } from './appendOneGroup';
import { getGroups, groupsPreviewBlocksLoadedClassName } from './appendPreviewBlocks';
import { isVip } from './isVip';

const maxGroups = 5;

export const appendPreviewGroups = _.throttle(appendPreviewGroups0, 1000, { leading: true, trailing: true });

export async function appendPreviewGroups0({ mode = MODE.tailwind } = {}) {
  console.log('\n\n%c--------- appendPreviewGroups0 ---------', 'background:yellow; color:blue; font-weight:600;');
  console.log('mode', mode);

  let chatGroups = Array.from(getGroups());
  console.log('chatGroups', chatGroups);
  const totalCount = chatGroups.length;
  console.log('totalCount', totalCount);

  const vip = await isVip();
  const buyIndex = totalCount - maxGroups;
  console.log('buyIndex', buyIndex);

  for (let index = chatGroups.length - 1; index >= 0; index--) {
    console.log('index', index);
    const group = chatGroups[index];
    const groupLoaded = hasClass(group, groupsPreviewBlocksLoadedClassName)
    console.log('groupLoaded', groupLoaded);

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



