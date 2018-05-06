import fastclone from 'fast-clone';
import { deepEqual } from 'fast-equals';
import UAParser from 'ua-parser-js';
import constants from './constants';

const parser = new UAParser();
const browserName = parser.getBrowser().name;
const deviceType = parser.getDevice().type;

export default {
  /**
   * ディープコピーを行います。
   * @param  {Object} obj オブジェクト
   */
  cloneDeep(obj) {
    return fastclone(obj);
  },
  /**
   * オブジェクトの比較を行います。
   * @param  {Object} a オブジェクト a
   * @param  {Object} b オブジェクト a
  */
  equal(a, b) {
    return deepEqual(a, b);
  },
  /**
   * サポートブラウザーならtrueを返します。
   */
  isSupportBrowser() {
    return constants.SUPPORTEDBROWSERS.indexOf(browserName) >= 0;
  },
  /**
   * モバイルならtrueを返します。
   */
  isMobile() {
    return deviceType === 'mobile';
  },
  /**
   * 引き数の値がemailとして正しいかチェックする
   * @param  {String} email
   */
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
};
