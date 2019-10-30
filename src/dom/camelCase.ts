const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

/**
 * @desc 获取字符串的小驼峰格式，如'my-function'转为'myFunction'
 * @param name
 */
function camelCase(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, "Moz$1");
}

export = camelCase;
