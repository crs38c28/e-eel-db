// ==UserScript==
// @name         Kobo Book Update Check
// @namespace    https://e-eel.pages.dev
// @version      0.4
// @description  Check kobo book update from your library.
// @author       Crs
// @match        https://www.kobo.com/*/*/library*
// @icon         https://play-lh.googleusercontent.com/Kn2_QyHt6u5xb1Y9rCdHdDfAROeLB4cgzcerF9U3IfLYNcSagBpILVvW_YWy7W8a-GQ=w50-h50-rw
// @grant        none
// ==/UserScript==

(function koboUpdate() {
  const checkButton = document.createElement('button');
  checkButton.innerHTML = '確認此頁書本更新狀況';
  checkButton.style.backgroundColor = '#EDEDED';

  const waitForSecs = async (ms = 3000) => new Promise((r) => setTimeout(r, ms));
  const idRegex = /readingservices\.kobo\.com\/ReadNow\/([0-9a-z-]{36})/;
  const twStoreProductIdRegex = /id="ratItemId"\s+value="([0-9a-z-]{36})">/;
  const globalStoreProductIdRegex = /class="item-primary-metadata book-primary-metadata"\s+data-track-info='{&quot;productId&quot;:&quot;([0-9a-z-]{36})&quot;}'/;
  const bookUpdateCheck = async () => {
    checkButton.disabled = true;
    const allBooks = document.querySelectorAll('.library-items .item-wrapper.book');
    for (const bookElement of Array.from(allBooks)) {
      const previewLink = bookElement.querySelector('.item-image a').href;
      const storelink = bookElement.querySelector('.item-info.main-meta a').href;
      const productId = previewLink.match(idRegex)?.[1] || '';
      const statusElement = bookElement.querySelector('.product-field.item-status');
      statusElement.innerHTML = '取得資訊中...';
      try {
        const data = await fetch(storelink).then((response) => {
          if (!response.ok) {
            throw new Error('無法取得書本資料');
          }
          return response.text();
        });
        const latestProductId = data.match(twStoreProductIdRegex)?.[1] || data.match(globalStoreProductIdRegex)?.[1] || '';
        if ((latestProductId === '') || (productId === '')) {
          throw new Error('找不到商品編號(Kobo網頁改版?)');
        }
        const checkText = document.createElement('div');
        checkText.innerHTML = (latestProductId === productId) ? '書本已是最新狀態' : '書本須聯絡客服更新';
        checkText.style.backgroundColor = (latestProductId === productId) ? '#EDEDED' : '#fca5a5';
        statusElement.innerHTML = '';
        statusElement.append(checkText);
      } catch (error) {
        const checkText = document.createElement('div');
        checkText.innerHTML = error.message;
        checkText.style.backgroundColor = '#fef08a';
        statusElement.innerHTML = '';
        statusElement.append(checkText);
      }
      await waitForSecs();
    }
    checkButton.disabled = false;
  };
  const toolbar = document.querySelector('.library-controls .secondary-controls');
  toolbar.insertBefore(checkButton, toolbar.firstChild);
  checkButton.addEventListener('click', bookUpdateCheck);
}());
