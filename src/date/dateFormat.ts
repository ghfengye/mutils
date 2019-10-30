import toLocalTime from "./toLocalTime";

/**
 * @desc 返回日期格式化
 * @param format 指定格式
 * @param timestamp
 */
function dateFormat(timestamp, format?) {
  return toLocalTime(timestamp).format(format || "YYYY-MM-DD");
}

export = dateFormat;
