
# Kobo書櫃更新檢查工具

Kobo 並不會主動通知消費者書本更新，出版社也不會公告有書本更新。  

另外不像其他平台自動更新書檔、或自己選擇更新書檔，Kobo 需要寫信請客服更新。  

因此買 Kobo 的人，除非你從某些社群的討論區得知書本有更新，否則你是不可能知道書需要更新的。  

## 運作原理

Kobo 會幫每本書帶上一個專屬的編號，若今天書本更新了，就會有一個 `新的編號`。  

透過書櫃內查詢自己書本的編號，比對目前商店頁面上的最新編號，若不同則代表書本需要更新。  

## 安裝

1. 請先安裝
> - [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) (Chrome / Edge 用戶)
> - [GreasyMonkey](https://addons.mozilla.org/zh-TW/firefox/addon/greasemonkey/) (Firefox用戶)
> - 其他平台可參照[Userscript管理器列表](https://greasyfork.org/zh-TW)

2. 安裝匯入 Userscript
> - [安裝連結](https://github.com/crs38c28/e-eel-db/raw/main/userscript/kobo-update-check.user.js)

3. 進入書櫃會看見`確認此頁書本更新狀況`的按鈕  

![UI示意圖](https://i.imgur.com/QsqhvQp.png)

4. 等待掃描書櫃 (每本等待 3 秒)，建議可將列表改為一頁顯示 60 筆並放著給他跑 (每頁約3分鐘)，或先搜尋出想檢查的書再執行

5. 狀態介紹

![狀態示意圖](https://i.imgur.com/HZvxOKu.png)

> - 取得資訊中: 正在擷取商店頁面資訊
> - 書本已是最新狀態
> - 無法取得書本資訊: 可能為 書本下架，或其他原因造成無法取得書本資訊，可以點擊書名檢查是否有該商品頁面
> - 書本須聯絡客服更新: 請記下此本`書名`，並通知客服更新檔案

6. 到[購買紀錄](https://secure.kobobooks.com/profile/purchasehistory)，搜尋剛剛記下的書名，並記下`訂單號碼`

7. 將`書名`、`訂單號碼`整理好，並[填單給客服](https://help.kobo.com/hc/zh-tw/requests/new)，請他們協助更新
