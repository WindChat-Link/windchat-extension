
export function hasClass(element, name) {
  if (name.indexOf(' ') > -1) {
    name = name.split(/\s+/)
  }

  if (typeof name === 'string') {
    const list = Array.from(element.classList);
    return list.includes(name)
  } else {
    for (const item of name) {
      if (!element.classList.contains(item)) {
        return false;
      }
    }
    return true;
  }
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

