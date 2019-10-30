/**
 * @author mzn
 * @desc 导出全部函数
 */

// array Fn
import arrayFlat  from './arrayTool/arrayFlat';
import differenceABArray from './arrayTool/differenceABArray';
import intersectionArray from './arrayTool/intersectionArray';

// date Fn
import dateFormat from './date/dateFormat';
import toLocalTime from './date/toLocalTime';

// dom Fn
import addClass from './dom/addClass';
import camelCase from './dom/camelCase';
import getStyle from './dom/getStyle';
import hasClass from './dom/hasClass';
import off from './dom/off';
import on from './dom/on';
import removeClass from './dom/removeClass';
import setStyle from './dom/setStyle';
import setToPx from './dom/setToPx';

// storage
import local from './storage/local';
import session from './storage/session';

// storageListener Fn 用于解决跨页面数据通信
import emitStorage from './storageListener/emitStorage';
import offStorage from './storageListener/offStorage';
import onStorage from './storageListener/onStorage';

export = { 
    differenceABArray,
    intersectionArray,
    arrayFlat,
    dateFormat,
    toLocalTime,
    addClass,
    camelCase,
    getStyle,
    hasClass,
    off,
    on,
    removeClass,
    setStyle,
    setToPx,
    local,
    session,
    emitStorage,
    offStorage,
    onStorage,
};

