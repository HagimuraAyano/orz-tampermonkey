// ==UserScript==
// @name         Fxxk RYF
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  No Ads And Help adblock work better
// @author       ayano
// @match        http://www.ruanyifeng.com/blog/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function() {
      var themeCssLink = document.createElement('link');
      themeCssLink.rel = 'stylesheet';
      themeCssLink.type = 'text/css';
      themeCssLink.href = 'http://www.ruanyifeng.com/static/themes/theme_scrapbook/theme_scrapbook.css';
      var styleCssLink = document.createElement('link');
      styleCssLink.rel = 'stylesheet';
      styleCssLink.href = 'http://www.ruanyifeng.com/blog/styles.css';
      styleCssLink.type = 'text/css';
      document.head.appendChild(themeCssLink);
      document.head.appendChild(styleCssLink);
    }
})();