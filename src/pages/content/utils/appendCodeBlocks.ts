import { log, getGroups, isVip } from '../initLoad';
import { hashCode } from './urlHash';
import { addStyle, hasClass } from '../utils';
import { appendFrame } from './appendFrame';
import { groupFindBlocksClassName } from '../components/renderPreviewBlocks';
import { getCodeListOfBlock } from './getCodeListOfBlock';
import { Mode } from '../config';

/** 
 * Code Block
 */
export const codeBlockClass = 'thp-code-block';
export const previewBlockAddedClass = 'thp-preview-block-added';
export const codeBlockAddedClass = 'thp-code-block-added';


export const codeBlockStyles = {
  border: '1px solid rgba(52,53,65,1)',
  marginTop: '1.5rem',
};

export async function appendCodeBlocks(mode = Mode.tailwind) {
  log('\n\n%c--------- appendCodeBlocks ---------', 'background:yellow; color:blue; font-weight:600;');

  let groups = Array.from(getGroups()).reverse();

  let countGroups = 0;
  const vip = await isVip();

  const freeCount = 6;
  log('groups.length', groups.length);

  for (let index = 0; index < groups.length; index++) {
    const group = groups[index];

    const blocks = group.getElementsByClassName(groupFindBlocksClassName);
    const block = blocks?.[0] as HTMLElement;
    const previewCodeBlock = group.getElementsByClassName(codeBlockClass)?.[0] as HTMLElement;

    if (!vip && countGroups === freeCount) {
      countGroups++;

      if (hasClass(previewCodeBlock, codeBlockAddedClass)) continue;

      previewCodeBlock.innerHTML = '';
      const purchaseDiv = document.createElement('div');
      const purchaseStyles = {
        fontSize: '20px',
        width: '600px',
        textAlign: 'center',
        paddingTop: '10px',
      };

      addStyle(purchaseDiv, purchaseStyles);

      purchaseDiv.innerHTML = `<div>
      <div style="margin-bottom:10px;">Please buy a license to preview more messages.</div>
      <a style="color:#4F46E5;" target="_blank" href="https://www.windchat.link#pricing">
      Pricing
      </a>
      </div>
      `;
      previewCodeBlock.appendChild(purchaseDiv);
      previewCodeBlock.classList.add(codeBlockAddedClass);
    } else if (!vip && countGroups >= freeCount) {
      countGroups++;
      if (hasClass(previewCodeBlock, codeBlockAddedClass)) continue;

      previewCodeBlock.innerHTML = '';
      previewCodeBlock.classList.add(codeBlockAddedClass);
    } else {
      if (hasClass(previewCodeBlock, codeBlockAddedClass)) {
        countGroups++;
      } else {
        if (block && previewCodeBlock) {
          const codeList = getCodeListOfBlock(block, mode);
          let hasCode = false;

          if (mode === Mode.tailwind) {
            for (const code of codeList) {
              const codeBlock = document.createElement('code');

              addStyle(codeBlock, codeBlockStyles);

              codeBlock.innerHTML = code;
              previewCodeBlock.appendChild(codeBlock);
              hasCode = true;
            }
          } else {
            for (const code of codeList) {
              const frameBlock = appendFrame({ code })
              hasCode = true;
              previewCodeBlock.appendChild(frameBlock);
            }
          }

          if (hasCode) {
            countGroups++;
          }
        }

        previewCodeBlock.classList.add(codeBlockAddedClass);
      }
    }
  }

}
