import { log, isGroupActive } from '../initLoad';
import { hasClass } from '../utils';

// not used
export function waitBlocks(
  loadedCallback = (...args) => { },
  lastChatCallback = (...args) => { },
  debouncedThumbCallback = (...args) => { },
  debouncedTitleCallback = (...args) => { },
  debouncedBodyCallback = (...args) => { },
  throttleIdNextCallback = (...args) => { },
  throttleToolbarCallback = (...args) => { },
  textareaCallback = (...args) => { },
  newChatTitleCallback = (...args) => { },
) {
  log('\n\n%c--------- waitBlocks ---------', 'background:yellow; color:blue; font-weight:600;');

  const observer = new MutationObserver(async (mutationsList, observer) => {
    mutationsList.forEach(async (mutation) => {

      const target = mutation.target as HTMLElement;
      const type = mutation.type;
      const tagName = target.tagName;

      // log('target', target);
      // log('type', type);
      // log('tagName', tagName);

      const id = target.id;

      if (id === '__next') {
        log('\n\n%c--------- throttleIdNextCallback ---------', 'background:yellow; color:blue; font-weight:600;');
        throttleIdNextCallback();
      }
      // BodyChange 事件 需要用来添加 Switch，不能禁用
      // @ts-ignore
      if (tagName === 'BODY' && type === 'childList') {
        debouncedBodyCallback();
      }

      // @ts-ignore
      if (hasClass(target, 'flex-1') &&
        hasClass(target, 'break-all') &&
        hasClass(target, 'text-ellipsis')) {
        log('\n\n%c--------- debouncedTitleCallback ---------', 'background:yellow; color:blue; font-weight:600;');
        newChatTitleCallback();
      }

      // @ts-ignore
      if (hasClass(target, 'flex') &&
        hasClass(target, 'break-all') &&
        hasClass(target, 'relative') &&
        hasClass(target, 'items-center') &&
        hasClass(target, 'gap-3')) {
        log('\n\n%c--------- debouncedTitleCallback ---------', 'background:yellow; color:blue; font-weight:600;');
        debouncedTitleCallback();
      }

      if (hasClass(target, 'h-full') &&
        hasClass(target, 'flex') &&
        hasClass(target, 'justify-center')) {
        log('\n\n%c--------- throttleToolbarCallback ---------', 'background:yellow; color:blue; font-weight:600;');
        throttleToolbarCallback();
      }

      if (target.id === "prompt-textarea") {
        log('\n\n%c--------- textareaCallback ---------', 'background:yellow; color:blue; font-weight:600;');
        textareaCallback();
      }


      const active = await isGroupActive();
      if (!active) return;

      // @ts-ignore
      // log('hasClass(target, flex-1)', hasClass(target, 'flex-1'));
      // log('hasClass(target, overflow-hidden)', hasClass(target, 'overflow-hidden'));

      if (mutation.type === 'childList' && mutation.addedNodes.length) {

        if (hasClass(target, 'flex-1') &&
          hasClass(target, 'overflow-hidden')) {

          log('\n\n%c--------- loadedCallback ---------', 'background:yellow; color:blue; font-weight:600;');
          loadedCallback(mutation);
        }

        // @ts-ignore
        if (hasClass(target, 'hljs') ||
          hasClass(target, 'xml') ||
          hasClass(target, 'hljs-tag')) {
          log('\n\n%c--------- lastChatCallback ---------', 'background:yellow; color:blue; font-weight:600;');
          lastChatCallback();
        }

        // @ts-ignore
        if (hasClass(target, 'absolute') &&
          hasClass(target, 'right-1') &&
          hasClass(target, 'rounded-md')) {
          log('\n\n%c--------- debouncedThumbCallback ---------', 'background:yellow; color:blue; font-weight:600;');
          debouncedThumbCallback();
        }


      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
