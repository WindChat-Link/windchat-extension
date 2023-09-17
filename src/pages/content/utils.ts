
export function hasClass(element, name) {
  const list = Array.from(element.classList);
  return list.includes(name)
}


export function addClass(element, classList) {
  if (!element) return;
  if (typeof classList === 'object') {
    for (const item of classList) {
      element.classList.add(item);
    }
  } else {
    element.classList.add(classList);
  }
}

export function removeClass(element, classList) {
  if (!element) return;
  if (typeof classList === 'object') {
    for (const item of classList) {
      element.classList.remove(item);
    }
  } else {
    element.classList.remove(classList);
  }
}


export function addStyle(element, styles = {}) {
  if (!element) return;

  for (const key of Object.keys(styles)) {
    element.style[key] = styles[key];
  }
}

