import { createRoot } from 'react-dom/client';
import PreviewBlock from '../components/PreviewBlock';
import { MODE } from '../config';
import { getCodeListOfBlock } from './getCodeListOfBlock';
import { addStyle, addClass } from '../utils';
import { previewBlockAddedClass } from './codeBlockConfig';
import { attachTwindStyle } from '../../../shared/style/twind';
import { groupStyles, answerBlockStyle, previewToolbarClass, previewBlockStyle } from './appendPreviewBlocks';
import { cn } from '../../../../utils/cn';

export function appendOneGroup({ index, group, mode = MODE.tailwind, buy = false, }) {

  const root = document.createElement('div');
  const rootIntoShadow = document.createElement("div");
  const shadowRoot = root.attachShadow({ mode: "open" });
  shadowRoot.appendChild(rootIntoShadow);

  attachTwindStyle(rootIntoShadow, shadowRoot);

  addStyle(group, groupStyles);

  // remove "model unavaliable" tips block
  const modelUnavailableBlock = group.querySelector('div.text-center.text-xs');
  if (modelUnavailableBlock) {
    group.removeChild(modelUnavailableBlock);
  }

  const answerBlock = group.querySelector('div:first-child');
  if (answerBlock) {
    addStyle(answerBlock, answerBlockStyle);
  }

  addClass(root, previewBlockAddedClass);
  addClass(root, previewToolbarClass);
  addStyle(root, previewBlockStyle);
  addClass(root, 'relative');

  if (buy) {
    createRoot(rootIntoShadow).render(
      <BuyLicenseTip></BuyLicenseTip>
    );
  } else {
    const codeList = getCodeListOfBlock(answerBlock, mode);

    createRoot(rootIntoShadow).render(
      <PreviewBlock groupIndex={index} codeList={codeList}></PreviewBlock>
    );
  }
  group.append(root);
}

export function BuyLicenseTip({ className = '', children = null, }) {
  return <div className={cn('text-center flex ac jc flex-col h-[200px] py-10', className)}>
    <div className={cn(`mb-4`,)}>Please buy a license to preview more messages.</div>
    <a className={cn(`text-[#4F46E5]`,)} target="_blank" href="https://www.windchat.link/chart#pricing">
      Pricing
    </a>
  </div>;
}
