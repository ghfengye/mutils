/**
 * @author mzn
 * @desc 差集
 * @param {Array} arr1
 * @param {Array} arr2
 */
function differenceABArray(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...new Set([...set1].filter(x => !set2.has(x)))];
}
export = differenceABArray;
