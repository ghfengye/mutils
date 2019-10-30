import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * @desc 返回对应时区的时间
 * @param timestamp
 */
function toLocalTime(timestamp) {
  return dayjs.utc(timestamp).local();
}

export = toLocalTime;
