(function (global) {
  'use strict';

  /**
   * get browser name. ブラウザ名を取得
   *
   * @param userAgent (string) ユーザーエージェント
   * @returns browser name (sring) ブラウザ名
   *    (chrome, safari, opera, firefox, ie6, ie7, ie8, ie9, ie10, ie11, unknown)
   */
  function getBrowser(userAgent) {
    var ua = userAgent.toLowerCase();
    var name = 'unknown';
  
    if (ua.indexOf('edge') != -1){
      name = 'edge';
    } else if (ua.indexOf('chrome') != -1){
      name = 'chrome';
    } else if (ua.indexOf('safari') != -1){
      name = 'safari';
    } else if (ua.indexOf('opera') != -1){
      name = 'opera';
    } else if (ua.indexOf('firefox') != -1){
      name = 'firefox';
    } else if (ua.indexOf('trident/7') != -1){
      name = 'ie11';
    } else if (ua.indexOf("msie") != -1){
      if (ua.indexOf("msie 6.") != -1){
        name = 'ie6';
      } else if (ua.indexOf("msie 7.") != -1){
        name = 'ie7';
      } else if (ua.indexOf("msie 8.") != -1){
        name = 'ie8';
      } else if (ua.indexOf("msie 9.") != -1){
        name = 'ie9';
      } else if (ua.indexOf("msie 10.") != -1){
        name = 'ie10';
      } else {
        name = 'ie';
      }
    }
    return name;
  } // getBrowser
  
  if (typeof module !== 'undefined')
    module.exports = getBrowser;
  else
    global.getBrowser = getBrowser;
})(Function('return this')());
