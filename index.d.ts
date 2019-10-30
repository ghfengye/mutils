/**
 * @author mzn
 * @desc 类型声明
 */

import * as Chai from 'chai'
import dayjs from 'dayjs';

declare global {
  interface Window {
    expect: Chai.ExpectStatic
  }
  var expect: Chai.ExpectStatic
}

declare namespace mUtils {
  /**
   * @desc 两个数组的差集
   * @param {Array} arr1 
   * @param {Array} arr2 
   * @return {Array}
   */
  export function differenceABArray(arr1: Array<any>, arr2: Array<any>): Array<any>;
  
  /**
   * @desc 两个数组的交集
   * @param {Array} arr1 
   * @param {Array} arr2 
   * @return {Array}
   */
  export function intersectionArray(arr1: Array<any>, arr2: Array<any>): Array<any>;
  
  /**
   * @desc 数组平铺
   * @param {Array} arr 
   * @return {Array}
   */
  export function arrayFlat(arr: any[]): any[];

  /**
   * @desc 返回日期格式化
   * @param format 指定格式
   * @param timestamp
   * @return {String}
   */
  export function dateFormat(timestamp, format?) : string;

  /**
   * @desc 返回对应时区时间的dayjs对象
   * @param timestamp
   */
  export function toLocalTime(timestamp): dayjs.Dayjs;

  /**
   * @desc 为元素添加类名
   * @param {HTMLElement} el
   * @param {string} cls
   */
  export function addClass(el: HTMLElement, cls: string): void;

  /**
   * @desc 判断元素是否有某个class
   * @param {HTMLElement} el 
   * @param {String} cls 
   * @return {Boolean}
   */
  export function hasClass(el: HTMLElement, cls: string): boolean;

  /**
   * @desc 判断元素是否有某个class
   * @param {HTMLElement} el 
   * @param {String} cls 
   */
  export function removeClass(el: HTMLElement, cls: string): void;

  /**
   * @desc 获取元素某行内样式的值
   * @param {HTMLElement} element
   * @param {string} styleName
   */
  export function getStyle(element: HTMLElement,styleName: string): any;

  /**
   * @desc  为元素设置行内样式
   * @param {HTMLElement} element
   * @param {string} styleName
   * @param value
   */
  export function setStyle(element: HTMLElement,styleName: string, value?: string): void;

  /**
   * @desc 绑定事件
   * @param {HTMLElement} element 
   * @param {string} event 
   * @param {Function} handler 
   */
  export function on(element: HTMLElement, event: string, handler: () => void): void;

   /**
   * @desc 解绑事件
   * @param {HTMLElement} element 
   * @param {string} event 
   * @param {Function} handler 
   */
  export function off(element: HTMLElement, event: string, handler: () => void): void;

  /**
   * @desc 为数值加上像素单位px
   * @param {String} value
   * @return {String}
   */
  export function setToPx(value: string): string;
 
  /**
   * @desc
   * @param {String} name 
   * @return {String}
   */
  export function camelCase(name: string): string;

  export class StorageCustom {
    constructor(strategy?: String)

    set(key: string, val: any, maxAge?: number): void

    get(key: string): any

    remove(key: string): void
  }

  /**
   * @desc localStorage缓存
   */
  export const local: StorageCustom; 

  /**
   * @desc sessionStorage缓存
   */
  export const session: StorageCustom; 

  /**
   * @desc 修改本地storage用于触发事件监听
   *       用于解决跨页面的数据交互问题
   * @param key
   */
  export function emitStorage(key): void;

  /**
   * @desc 解绑当前绑定的事件
   *       用于解决跨页面的数据交互问题
   * @param key
   */
  export function offStorage(key): void;

  /**
   * @desc 触发当前绑定的事件
   *       用于解决跨页面的数据交互问题
   * @param key
   */
  export function onStorage(key): void;
}

export = mUtils;