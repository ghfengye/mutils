/**
 * @author mzn
 * @desc 解绑事件
 * @param {HTMLElement} element 解绑事件的元素
 * @param {string} event  事件类型
 * @param handler 事件处理函数
 */
const off = (() => {
  if (document.removeEventListener) {
    return (element, event, handler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return (element, event, handler) => {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

export = off;
