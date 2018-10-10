// ==UserScript==
// @name         easyFocus(Alt+G)
// @namespace    http://jiesuqi.com
// @version      0.1
// @description  quick focus elements by using keyboard
// @author       madao
// @include      *
// @grant        none
// ==/UserScript==
(function setAnchors() {
  const $$ = document.querySelectorAll.bind(document);
  /* 获取所有的可焦点元素 */
  const links = Array.from($$('a:not([href="javascript:;"])'));
  const buttons = Array.from($$('button:not([disabled]):not([hidden])'));
  const inputs = Array.from($$('input:not([type="hidden"]):not([disabled]):not([hidden])'));
  const textareas = Array.from($$('textarea:not([disabled]):not([hidden])'));
  const eleList = links.concat(buttons, inputs, textareas);

  /* 提示点位置 */
  const positionList = [];
  /* 容器 */
  const container = document.createElement('div');
  container.style.zIndex = '99999';
  container.style.display = 'none';
  container.style.position = 'absolute';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.left = '0';
  container.style.top = '0';
  /* 是否显示 */
  let show = false;
  let max = -1;
  /* 添加提示标识 */
  eleList.forEach(ele => {
    const style = window.getComputedStyle(ele, null);
    if (style.getPropertyValue('display') === 'none' 
      || style.getPropertyValue('visibility') === 'hidden'
      || style.getPropertyValue('opacity') === '0'
    ) {
      return;
    }
    const tip = document.createElement('div');
    const rect = ele.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    max += 1;
    tip.innerText = max;
    tip.style.padding = '0 6px';
    tip.style.lineHeight = '21px';
    tip.style.fontSize = '14px';
    tip.style.backgroundColor = '#c22';
    tip.style.color = '#FFF';
    tip.style.position = 'absolute';
    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
    positionList.push({ top, left, width: ele.offsetWidth, height: ele.offsetHeight});
    container.appendChild(tip);
  });

  // searchBox
  const searchBox = document.createElement('input');
  searchBox.style.position = 'fixed';
  searchBox.style.width = '100%';
  searchBox.style.maxWidth = '300px';
  searchBox.style.bottom = 0;
  searchBox.style.left = '50%';
  searchBox.style.transform = 'translateX(-50%)';
  searchBox.style.lineHeight = '36px';
  searchBox.style.fontSize = '18px';
  searchBox.style.boxSizing = 'border-box';
  searchBox.style.padding = '0 20px';
  searchBox.type = 'number';
  searchBox.max = max;
  searchBox.min = 0;

  const hinter = document.createElement('div');
  hinter.style.borderWidth = '2px';
  hinter.style.borderColor = '#c22';
  hinter.style.borderStyle = 'solid';
  hinter.style.position = 'absolute';
  hinter.style.boxShadow = '0 0 8px #c22';
  container.appendChild(searchBox);
  container.appendChild(hinter);
  document.body.appendChild(container);

  function hide() {
    container.style.display = 'none';
    searchBox.value = '';
    show = false;
  }

  searchBox.addEventListener('input', function (ev) {
    let idx = this.value;
    if (idx === '') return;
    else idx = Number(idx);

    if (idx < 0 || idx > max) {
      this.style.backgroundColor = '#c22';
      return;
    }
    this.style.backgroundColor = '';
    const position = positionList[idx];
    window.scrollTo(position.left, position.top);

    hinter.style.left = position.left + 'px';
    hinter.style.top = position.top + 'px';
    hinter.style.width = position.width + 'px';
    hinter.style.height = position.height + 'px';
  });

  searchBox.addEventListener('keyup', function (ev) {
    const idx = Number(this.value);
    if (ev.code === 'Enter' && idx >= 0 && idx < eleList.length) {
      eleList[idx].focus();
      hide();
    }
  })

  window.addEventListener('keyup', function (ev) {
    if (ev.code === 'KeyG' && ev.altKey) {
      show = !show;
    } else {
      return;
    }

    if (show) {
      container.style.display = '';
      searchBox.focus();
    } else {
      hide();
    }
  });
})();
