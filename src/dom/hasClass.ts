/**
 * @author mzn
 * @desc 检查元素是否包含对应样式
 * @param {HTMLElement} el 元素
 * @param {string} cls 样式名称
 */
function hasClass(el, cls) {
  if (!el || !cls) {
    return false;
  }
  if (cls.indexOf(" ") !== -1) {
    throw new Error("className should not contain space.");
  }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}
export = hasClass;
