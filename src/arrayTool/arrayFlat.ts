/**
 * @author mzn
 * @desc 数组平铺
 * @param {Array} arr
 * @return {Array}
 */
function arrayFlat(arr: any[]) {
  let temp: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Object.prototype.toString.call(item).slice(8, -1) === "Array") {
      temp = temp.concat(arrayFlat(item));
    } else {
      temp.push(item);
    }
  }
  return temp;
}

export = arrayFlat;
