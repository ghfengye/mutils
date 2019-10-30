/**
 * @author mzn
 * @desc 绑定事件
 * @param {HTMLElement} element 绑定事件的元素
 * @param {string} event  事件类型
 * @param handler 事件处理函数
 */
const on = (() => {
  if (document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

export = on;
