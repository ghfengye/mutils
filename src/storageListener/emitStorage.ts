/**
 * @desc 修改本地storage用于触发事件监听
 *       用于解决跨页面的数据交互问题
 * @param key
 */
function emitStorage(key) {
  try {
    window.localStorage.setItem(`mutations-sharer_storage_${key}`, key);
    window.localStorage.removeItem(`mutations-sharer_storage_${key}`);
  } catch (e) {
    console.error("Unable to use setItem on localStorage. Disabling plugin.");
    return;
  }
}

export = emitStorage;
