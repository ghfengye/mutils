import hasClass from "./hasClass";

const trim = function trim(string) {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

/**
 * @desc 为元素添加类名
 * @param {HTMLElement} el
 * @param {string} cls
 */
function removeClass(el, cls) {
  if (!el || !cls) {
    return;
  }
  let classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export = removeClass;
