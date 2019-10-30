import hasClass from "./hasClass";

/**
 * @desc 为元素添加类名
 * @param {HTMLElement} el
 * @param {string} cls
 */
function addClass(el, cls) {
  if (!el) {
    return;
  }
  let curClass = el.className;
  let classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export = addClass;
