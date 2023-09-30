import { createRoot } from 'react-dom/client';
import PreviewBlock from '../components/PreviewBlock';
import { MODE } from '../config';
import { addClass, addStyle } from '../utils';
import { answerBlockStyle, groupStyles, previewBlockStyle, previewToolbarClass } from './appendPreviewBlocks';
import { previewBlockAddedClass } from './codeBlockConfig';
import { getCodeListOfBlock } from './getCodeListOfBlock';

export function updateLastGroupCodeList({ index, group, mode = MODE.tailwind, }) {
  addStyle(group, groupStyles);

  const previewCodeBlock = document.createElement('div');

  // remove "model unavaliable" tips block
  const modelUnavailableBlock = group.querySelector('div.text-center.text-xs');
  if (modelUnavailableBlock) {
    group.removeChild(modelUnavailableBlock);
  }

  const answerBlock = group.querySelector('div:first-child');
  if (answerBlock) {
    addStyle(answerBlock, answerBlockStyle);
  }

  addClass(previewCodeBlock, previewBlockAddedClass);
  addClass(previewCodeBlock, previewToolbarClass);
  addStyle(previewCodeBlock, previewBlockStyle);
  addClass(previewCodeBlock, 'relative');

  const codeList = getCodeListOfBlock(answerBlock, mode);

  createRoot(previewCodeBlock).render(
    <PreviewBlock groupIndex={index} codeList={codeList}></PreviewBlock>
  );

  group.append(previewCodeBlock);
}
