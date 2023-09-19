import { MODE } from '../config';


export function detectCodeLanguage() {
  return
}

export function getCodeListOfBlock(block, mode = MODE.tailwind) {
  let codeTextList = [];
  const items = [];

  const preList = block.getElementsByTagName('pre');
  const blockCodeList = [];

  for (let index = 0; index < preList.length; index++) {
    const pre = preList[index];
    const codeElements = pre.getElementsByTagName('code');

    for (const ele of codeElements) {
      const code = ele.innerText;
      const classList = (Array.from(ele.classList) || []) as string[];
      const language = classList.filter(i => i.startsWith('language-'))[0].replace('language-', '');
      blockCodeList.push({
        code, language
      })
    }

    codeTextList = [
      ...codeTextList,
      ...Array.from(codeElements).map((item) => {
        // @ts-ignore
        return item.innerText;
      })
    ];
  }

  console.log('blockCodeList', blockCodeList);

  return blockCodeList;
}
