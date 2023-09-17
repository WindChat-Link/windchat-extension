
export function addStyle(ele, styles) {
  const keys = Object.keys(styles);
  for (const key of keys) {
    ele.style[key] = styles[key]
  }
}

export function addClasses(ele: HTMLElement, classList) {
  for (const name of classList) {
    ele.classList.add(name)
  }
}

export function removeClasses(ele, classList) {
  for (const name of classList) {
    ele.classList.remove(name)
  }
}


export function hasClass(ele, name) {
  const classList = Array.from(ele.classList);
  return classList.includes(name)
}

export function matchClass(ele, regex) {
  const classList = Array.from(ele.classList);
  return classList.some(className => regex.test(className));
}
