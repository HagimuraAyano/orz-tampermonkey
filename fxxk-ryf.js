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
      var styleCssLink = document.createElement('link');
      styleCssLink.rel = 'stylesheet';
      styleCssLink.href = 'http://www.ruanyifeng.com/blog/styles.css';
      styleCssLink.type = 'text/css';
      document.head.appendChild(styleCssLink);
    }
})();