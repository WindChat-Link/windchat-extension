export function scrollToTop() {
  window.scrollTo(0, 0);
};

export function scrollToTopElement(selector) {
  const ele = document.getElementsByClassName(selector)?.[0]
  if (ele) {
    ele?.scrollTo(0, 0)
  }
};

export function scrollToBottomElement(selector) {
  const ele = document.getElementsByClassName(selector)?.[0]
  if (ele) {
    ele?.scrollTo(0, ele.scrollHeight)
  }
}
