import off from "../dom/off";

/**
 * @desc 解绑当前绑定的事件
 *       用于解决跨页面的数据交互问题
 * @param key
 */
function offStorage(key) {
  off(window, "storage", window[`__callback${key}__`]);
  delete window[`__callback${key}__`];
}

export = offStorage;
