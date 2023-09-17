import { MODE, reactLanguages } from '../config';

export function getCodeListOfBlock(block, mode = MODE.tailwind) {
  let codeTextList = [];

  const preList = block.getElementsByTagName('pre');

  for (let index = 0; index < preList.length; index++) {
    const pre = preList[index];
    if (mode === MODE.react) {
      const langEle = pre.querySelector('.bg-gray-800>span')
      const lang = (langEle.textContent || '').toLowerCase()

      if (!reactLanguages.includes(lang)) {
        continue;
      }
    }

    const codeList = pre.getElementsByTagName('code');
    codeTextList = [
      ...codeTextList,
      ...Array.from(codeList).map((item) => {
        // @ts-ignore
        return item.innerText;
      })
    ];
  }

  return codeTextList;
}
