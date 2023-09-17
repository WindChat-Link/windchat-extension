import { log, containerSelector } from '../initLoad';
import { addClass, addStyle, hasClass } from '../utils';

export const containerStyles = {
  minWidth: 'calc(100vw - 270px)',
}

export const containerParentStyles = {
  display: 'flex'
}
export const containerParentStylesAdded = 'containerParentStylesAdded';

export function setContainerFlex() {
  log('\n\n%c--------- setContainerFlex ---------', 'background:yellow; color:blue; font-weight:600;');

  const ele = document.querySelector(containerSelector) as HTMLElement;
  log('setContainerFlex ele', ele);

  if (ele) {
    if (hasClass(ele, containerParentStylesAdded)) return;

    addStyle(ele, containerStyles);
    // @ts-ignore
    if (ele.parentNode.style.display !== 'flex') {
      addStyle(ele.parentNode, containerParentStyles);
    }
    addClass(ele, containerParentStylesAdded);
  }
}
