import { appendGroups } from './appendGroups';
import { removeAvatar } from './removeAvatar';
import { removeThumbs } from './removeThumbs';
import { setChatBlockStyle } from './setChatBlockStyle';
import { setContainerFlex } from './setContainerFlex';
import { checkPreviewBlockInited } from './observeAll';


export function applyChatGroupsChanges() {
  console.log('\n\n%c--------- applyChatGroupsChanges ---------', 'background:yellow; color:blue; font-weight:600;');
  const loaded = checkPreviewBlockInited();
  console.log('loaded', loaded);

  if (!loaded) {
    removeAvatar();
    removeThumbs();
    setContainerFlex();
    setChatBlockStyle();
    appendGroups();
  }
}
