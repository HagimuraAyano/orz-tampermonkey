// ==UserScript==
// @name         qrcode(Ctrl+Q)
// @namespace    http://litianwen.cn
// @version      0.1
// @description  qrcode generator
// @author       ayano
// @include      *
// @grant        none
// @require      https://cdn.bootcss.com/qrcode-generator/1.2.0/qrcode.min.js
// ==/UserScript==
let QrCode = {
  create: function (str) {
    var typeNumber = 10;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(str);
    qr.make();
    var placeHolder = document.createElement('div');
    var id = 'ayano' + Date.now();
    placeHolder.id = id;
    placeHolder.innerHTML = qr.createImgTag();
    placeHolder.style.position = "fixed";
    placeHolder.style.border = "solid 20px #333";
    placeHolder.style.left = "50%";
    placeHolder.style.top = "50%";
    placeHolder.style.transform = "translate(-50%, -50%)";
    placeHolder.style.zIndex = 9999;
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