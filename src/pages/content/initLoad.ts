import { debounce, throttle } from '../../utils/lo';
import { DEBUG_ALL_ENABLE } from './config';
import { appendSwitch } from './dom/appendSwitch';
import { removeAvatar } from './dom/removeAvatar';
import { removeThumbs } from './dom/removeThumbs';
import { setContainerFlex } from './dom/setContainerFlex';
import { waitBlocks } from './dom/waitBlocks';

let activeGroupsMap = {};
const DEBUG = false;

export function log(...v) {
  if (DEBUG) {
    console.log(...v);
  }
}

async function loadActiveGroupsMap() {
  const id = getGroupId()
  const resp = await chrome.storage.local.get(id)
  activeGroupsMap = resp;
}

/** 
 * Avatar
 */
export const avatarSelector = '.flex.flex-col.relative.items-end'
export const avatarSelectorAdded = 'avatarSelectorAdded'

/** 
 * Container
 */
export const containerSelector = '.flex.flex-col.items-center.text-sm'



/** 
 * Thumb
 */

export const thumbBlocksSelector = '.flex.justify-between .text-gray-400.self-end';
export const thumbBlocksSelectorAdded = 'thumbBlocksSelectorAdded';

/** 
 * Group
 */
const answerGroupsSelector = '.group.w-full.bg-gray-50';

/** 
 * Switch
 */
export const switchLabelClass = 'thp-switch-label'

export function getGroups() {
  const chatGroups = document.querySelectorAll(answerGroupsSelector) as NodeListOf<HTMLElement>;
  return chatGroups;
}

export function getGroupId() {
  const pathname = window.location.pathname;
  const id = pathname.split('/')?.[2];
  if (pathname === '/') {
    return 'home';
  }

  return id;
}

export async function setActiveGroupId(id, active) {
  log('\n\n%c--------- setActiveGroupId ---------', 'background:yellow; color:blue; font-weight:600;');

  await chrome.storage.local.set({ [id]: active })
  activeGroupsMap[id] = active;
}

export async function isGroupActive() {
  const id = getGroupId()
  if (DEBUG_ALL_ENABLE) return true;

  if (!id) return false;

  const data = await chrome.storage.local.get(id)
  activeGroupsMap = data;

  const active = !!data?.[id];
  return active;
}

export function isGroupActiveMap() {
  const id = getGroupId();

  return !!activeGroupsMap[id];
}


function removeCssRule() {
  var styleTag = document.querySelector("link[rel='stylesheet']");
  // @ts-ignore
  var sheet = styleTag?.sheet ? styleTag?.sheet : styleTag?.styleSheet;
  if (sheet && sheet?.cssRules) { // all browsers, except IE before version 9
    for (var i = 0; i < sheet?.cssRules.length; i++) {
      if (sheet.cssRules[i].selectorText === "[type=\"button\"], [type=\"reset\"], [type=\"submit\"], button") {
        sheet.deleteRule(i);
      }
    }
  }
}

async function onBlocksLoaded() {
  const isActive = await isGroupActive()
  if (!isActive) return

  removeAvatar();
  removeThumbs();
  setContainerFlex();

  // setChatBlockStyle();
  // appendPreviewBlock()
}

async function onLastChatChange() {
  log('\n\n%c--------- onLastChatChange ---------', 'background:yellow; color:blue; font-weight:600;');

  const active = await isGroupActive();
  removeAvatar()

  if (!active) return

  // setChatBlockStyle();
  // appendPreviewBlock()

  setTimeout(() => {
    removeThumbs()
  }, 0);
}

async function onThumbChange() {
  log('\n\n%c--------- onThumbChange ---------', 'background:yellow; color:blue; font-weight:600;');

  const active = await isGroupActive();
  if (!active) return

  removeThumbs();
}

async function onTitleChange() {
  log('\n\n%c--------- onTitleChange ---------', 'background:yellow; color:blue; font-weight:600;');

  setTimeout(() => {
    reCreateSwitch()
  }, 500);

  const active = await isGroupActive();
  log('\n\n%c--------- active ---------', 'background:yellow; color:blue; font-weight:600;');
  log('active', active);
  if (!active) return

  onBlocksLoaded()
  onLastChatChange()
}

function onToolbarChange() {
  log('\n\n%c--------- onToolbarChange ---------', 'background:yellow; color:blue; font-weight:600;');
}

function watchResize(handleResize = () => { }) {
  new ResizeObserver(() => {
    handleResize()
  }).observe(document.body)
}

async function reCreateSwitch0() {
  await loadActiveGroupsMap()
  await appendSwitch()
}

export const reCreateSwitch = throttle(reCreateSwitch0, 500, { 'trailing': true });

function onBodyChange() {
}

function onResize() {
}

function onIdNext() {
  log('\n\n%c--------- onIdNext ---------', 'background:yellow; color:blue; font-weight:600;');

  // 从 new 点到旧的聊天，有这个才能加上 switch
  reCreateSwitch()
}

function onTextareaChange() {

}

function onNewChatTitleChange() {
  onTitleChange()
}

// debouncedLoadedCallback 不能去掉，会导致刷新页面以后不生效
const debouncedLoadedCallback = debounce(onBlocksLoaded, 500, { 'maxWait': 1000 });

var debouncedLastChatCallback = throttle(onLastChatChange, 1000, { 'trailing': true });
const debouncedThumbCallback = debounce(onThumbChange, 200, { 'maxWait': 300 });
const debouncedTitleCallback = throttle(onTitleChange, 500, { 'trailing': true });
const debouncedBodyCallback = throttle(onBodyChange, 500, { 'trailing': true });
const throttleIdNextCallback = throttle(onIdNext, 500, { 'trailing': true });
const throttleToolbarCallback = throttle(onToolbarChange, 500, { 'trailing': true });
const textareaCallback = throttle(onTextareaChange, 500, { 'trailing': true });
const newChatTitleCallback = throttle(onNewChatTitleChange, 500, { 'trailing': true });

export function loadAll() {
  debouncedLoadedCallback();
  debouncedLastChatCallback()
  debouncedThumbCallback()
  debouncedTitleCallback()
  debouncedBodyCallback();
  throttleIdNextCallback();
}

export async function isVip() {
  const resp = await chrome.storage.local.get('licenseInfo')
  const data = resp?.licenseInfo;
  const valid = data?.valid;
  if (DEBUG_ALL_ENABLE) {
    return true
  }
  return !!valid
}

export async function initLoad() {
  console.log('\n\n%c--------- initLoad ---------', 'background:yellow; color:blue; font-weight:600;');

  loadActiveGroupsMap()

  isVip();

  const groupId = getGroupId();
  const active = await isGroupActive();
  activeGroupsMap[groupId] = active;

  waitBlocks(
    debouncedLoadedCallback,
    debouncedLastChatCallback,
    debouncedThumbCallback,
    debouncedTitleCallback,
    debouncedBodyCallback,
    throttleIdNextCallback,
    throttleToolbarCallback,
    textareaCallback,
    newChatTitleCallback,
  );

  const debouncedResizeCallback = debounce(onResize, 300, { 'maxWait': 500 });

  watchResize(debouncedResizeCallback);
  removeCssRule();

  setTimeout(() => {
    reCreateSwitch()
  }, 2000);
}
