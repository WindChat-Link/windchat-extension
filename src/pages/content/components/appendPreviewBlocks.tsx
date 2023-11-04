import { AppPrefix } from '../../../config';
import { MODE } from '../config';
import { addClass } from '../utils';
import { hasClass } from '../utils/utils';
import { appendOneGroup } from './appendOneGroup';
import { isVip } from './isVip';

/** 
 * Group
 */
const answerGroupsSelector = '.group.w-full.bg-gray-50';
export const groupsPreviewBlocksLoadedClassName = `${AppPrefix}-group-blocks-loaded`;

export function getAnswerGroups() {
  const chatGroups = document.querySelectorAll(answerGroupsSelector) as NodeListOf<HTMLElement>;
  return chatGroups;
}

/** 
 * Group
 */
export const groupStyles = {
  display: 'flex',
  gap: '0',
  alignItems: 'stretch',
  paddingRight: '10px',
  paddingLeft: '10px',
}


/** 
 * Preview Block
 */
export const previewBlockClass = `${AppPrefix}-preview-block`;
export const groupFindBlocksClassName = `text-base`
export const iframeBlockClass = `${AppPrefix}-iframe-block`;
export const previewToolbarClass = `${AppPrefix}-preview-toolbar`;

export const answerBlockStyle = {
  marginRight: 0,
  marginLeft: '0',
}

export const previewBlockStyle = {
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  overflowY: 'auto',
  position: 'sticky',
  maxHeight: '76vh',
  top: '61px',
  alignSelf: 'stretch',
}
