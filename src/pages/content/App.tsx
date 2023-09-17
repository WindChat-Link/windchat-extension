import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useInitStorage, useInstanceList } from '../../utils/pstore';
import { renderPreviewBlocks } from './components/renderPreviewBlocks';
import { isGroupActive } from './initLoad';
import { hasClass } from './utils';
import { previewBlockAddedClass } from './utils/appendCodeBlocks';
import { appendCodeLastChat } from './utils/appendCodeLastChat';
import { removeAvatar } from './utils/removeAvatar';
import { removeThumbs } from './utils/removeThumbs';
import { setChatBlockStyle } from './utils/setChatBlockStyle';
import { setContainerFlex } from './utils/setContainerFlex';
import { Mode } from './config';


export default function App() {
  const storageInited = useInitStorage();
  const mainObRef = useRef<any>();
  const sidebarObRef = useRef<any>();
  const countRef = useRef<any>(0);
  const mainHandlerRef = useRef<any>();
  const sidebarHandlerRef = useRef<any>();
  const pathname = window.location.pathname;
  console.log('\n\n%c--------- pathname ---------', 'background:yellow; color:blue; font-weight:600;');
  console.log('pathname', pathname);

  const [insList, setInsList] = useInstanceList()

  const [mode, setMode] = useState<any>(Mode.react);
  const lastTimerRef = useRef<any>();
  const previewBlocksInited = useRef<boolean>();
  const lastChatTimerRef = useRef<any>();

  const lastChatHandler2 = throttle(() => lastChatHandler0(), 500, { trailing: true, leading: true })

  function observeAll() {
    const observer = new MutationObserver(async (mutationsList, observer) => {
      mutationsList.forEach(async (mutation) => {

        console.log('mutationsList', mutationsList);
        const target = mutation.target as HTMLElement;
        const type = mutation.type;
        const tagName = target.tagName;

        // @ts-ignore
        if (hasClass(target, 'hljs') ||
          hasClass(target, 'xml') ||
          hasClass(target, 'hljs-tag')) {
          lastChatHandler2()
        }
      })

    })
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function lastChatHandler0() {
    setChatBlockStyle();
    renderPreviewBlocks({ last: true })
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
    console.log('loaded', loaded);
    if (!loaded) {
      removeAvatar();
      removeThumbs();
      setContainerFlex();
      setChatBlockStyle();

      renderPreviewBlocks()
    }

    // lastChatHandler(mutationsList)
  }

  function lastChatHandler(mutationsList) {
    /** 
    * 最后一个 chat
    */
    const isCodeChange = mutationsList.find(e =>
      hasClass(e.target, 'hljs') || hasClass(e.target.parentNode, 'markdown')
    )
    console.log('isCodeChange', isCodeChange);
    if (isCodeChange) {
      appendCodeLastChat(mode)
      if (lastTimerRef.current) {
        clearTimeout(lastTimerRef.current)
        lastTimerRef.current = null;
      }
      lastTimerRef.current = setTimeout(() => {
        appendCodeLastChat(mode)
        lastTimerRef.current = 0
      }, 1000);
    }
  }

  function mainHandler(mutationsList) {
    // console.log('\n\n%c--------- mainHandler ---------', 'background:yellow; color:blue; font-weight:600;');
    // console.log('mutationsList', mutationsList);
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
    console.log('\n\n%c--------- observeMain ---------', 'background:yellow; color:blue; font-weight:600;');
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



