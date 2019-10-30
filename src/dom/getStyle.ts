import camelCase from "./camelCase";

/**
 * @desc 获取元素某行内样式的值
 * @param {HTMLElement} element
 * @param {string} styleName
 */
function getStyle(element, styleName) {
  if (!element || !styleName) {
    return null;
  }
  let _styleName = camelCase(styleName);
  if (_styleName === "float") {
    _styleName = "cssFloat";
  }
  try {
    let computed = (document as any).defaultView.getComputedStyle(element, "");
    return element.style[_styleName] || computed ? computed[_styleName] : null;
  } catch (e) {
    return element.style[_styleName];
  }
}

export = getStyle;
