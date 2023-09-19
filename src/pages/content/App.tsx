import { throttle } from 'lodash';
import { useEffect, useRef } from 'react';
import { useInitStorage } from '../../utils/pstore';
import { previewBlockAddedClass } from './dom/codeBlockConfig';
import { removeAvatar } from './dom/removeAvatar';
import { removeThumbs } from './dom/removeThumbs';
import { appendPreviewBlocks } from './dom/appendPreviewBlocks';
import { setChatBlockStyle } from './dom/setChatBlockStyle';
import { setContainerFlex } from './dom/setContainerFlex';
import { isGroupActive } from './initLoad';
import { hasClass } from './utils';
import { appendSwitch } from './dom/appendSwitch';


export default function App() {
  const storageInited = useInitStorage();
  const mainObRef = useRef<any>();
  const sidebarObRef = useRef<any>();

  const lastChatHandler = throttle(() => lastChatHandler0(), 500, { trailing: true, leading: true })

  function observeAll() {
    const observer = new MutationObserver(async (mutationsList, observer) => {
      mutationsList.forEach(async (mutation) => {

        // console.log('mutationsList', mutationsList);
        const target = mutation.target as HTMLElement;
        const type = mutation.type;
        const tagName = target.tagName;

        // @ts-ignore
        if (hasClass(target, 'hljs') ||
          hasClass(target, 'xml') ||
          hasClass(target, 'hljs-tag')) {
          lastChatHandler()
        }
      })

    })
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function lastChatHandler0() {
    removeAvatar();
    removeThumbs();

    setChatBlockStyle();
    appendPreviewBlocks({ last: true })
  }

  useEffect(() => {
    observeAll()
  }, []);


  function checkPreviewBlockInited() {
    const found = document.querySelector(`.${previewBlockAddedClass}`)
    return !!found
  }

  function initAll(mutationsList) {
    const loaded = checkPreviewBlockInited()
    if (!loaded) {
      removeAvatar();
      removeThumbs();
      setContainerFlex();
      setChatBlockStyle();

      appendPreviewBlocks()
      appendSwitch()
    }

  }

  function mainHandler(mutationsList) {
    setTimeout(() => {
      initAll(mutationsList)
    }, 1000);
  }

  function sidebarHandler(mutationsList) {
    observeMain()
    setTimeout(() => {
      initAll(mutationsList)
    }, 1000);
  }

  function observeOne({
    handler,
    obRef, selector, observeOptions = {}
  }) {
    if (obRef.current) return;
    const ob = new MutationObserver(handler);
    console.log('selector', selector);
    ob.observe(document.querySelector(selector), { childList: true, subtree: true, ...observeOptions, });
    obRef.current = ob;
  }

  function observeMain() {
    observeOne({
      handler: mainHandler,
      obRef: mainObRef,
      selector: 'main .flex-1.overflow-hidden',
    })
  }

  async function initObservers() {
    const active = await isGroupActive();
    console.log('active', active);
    if (!active) return
    observeMain()

    observeOne({
      handler: sidebarHandler,
      obRef: sidebarObRef,
      selector: '.flex-col.flex-1.overflow-y-auto',
    })
  }

  useEffect(() => {
    initObservers()
  }, []);


  if (!storageInited) return null

  return <div className=''>
  </div>;
}



