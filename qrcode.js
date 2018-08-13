// ==UserScript==
// @name         qrcode(Ctrl+Q)
// @namespace    http://litianwen.cn
// @version      0.1
// @description  qrcode generator
// @author       ayano
// @include      *
// @grant        none
// @require      https://cdn.bootcss.com/qrcode-generator/1.4.0/qrcode.min.js
// ==/UserScript==
var QrCode = {
  create: function (str) {
      var typeNumber = 0;
      var errorCorrectionLevel = 'L';
      var qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData(str);
      qr.make();
      var img = document.createElement('img');
      img.src = qr.createDataURL(6);
      img.style.left = '50%';
      img.style.top = '50%';
      img.style.position = 'absolute';
      img.style.transform = 'translate(-50%, -50%)';

      var placeHolder = document.createElement('div');
      var id = 'ayano' + Date.now();
      placeHolder.id = id;
      placeHolder.style.textAlign = 'center';
      placeHolder.style.position = "fixed";
      placeHolder.style.backgroundColor = "rgba(51,51,51, 0.8)";
      placeHolder.style.width = '100%';
      placeHolder.style.height = '100%';
      placeHolder.style.left = 0;
      placeHolder.style.top = 0;
      placeHolder.style.zIndex = 9999;
      placeHolder.appendChild(img);
      document.body.appendChild(placeHolder);
      return placeHolder;
  },
  remove: function (placeHolder) {
      document.body.removeChild(placeHolder);
  },
  placeHolder: null
};

window.addEventListener('keyup', function (ev) {
  if (ev.code === 'KeyQ' && ev.ctrlKey) {
      if (QrCode.placeHolder) {
          QrCode.remove(QrCode.placeHolder);
          QrCode.placeHolder = null;
      } else {
          QrCode.placeHolder = QrCode.create(document.location.href);
      }
  }
});