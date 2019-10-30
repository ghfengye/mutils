import on from "../dom/on";

/**
 * @desc 触发当前绑定的事件
 *       用于解决跨页面的数据交互问题
 * @param key
 * @param callback
 */
function onStorage(key, callback) {
  window[`__callback${key}__`] = event => {
    let buildKey = `mutations-sharer_storage_${key}`;
    if (event.newValue === null) return;
    if (event.key !== buildKey) return;
    if (typeof callback === "function") {
      callback(event);
    } else {
      console.error("This method[callback] must be a function.");
    }
  };
  on(window, "storage", window[`__callback${key}__`]);
}

export = onStorage;
