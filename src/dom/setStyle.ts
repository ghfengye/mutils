import camelCase from "./camelCase";

/**
 * @desc  为元素设置行内样式
 * @param {HTMLElement} element
 * @param styleName
 * @param value
 */
function setStyle(element, styleName, value = "") {
  if (!element || !styleName) {
    return;
  }

  if (typeof styleName === "object") {
    for (let prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    let _styleName = camelCase(styleName);
    element.style[_styleName] = value;
  }
}

export = setStyle;
