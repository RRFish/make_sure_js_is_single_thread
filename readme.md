# 測試異步跟同步的執行有什麼差別

# 執行
```shell
npm install 
npm run test
```

# 結論
function內穿插await的方式，會讓這個task丟到web api等待，因此可能被其他function串改到共用的變數。
盡量減少使用共用變數，或者在呼叫完API後在一起進行變數的賦值、檢查...等等

# 參考
- event loop 介紹： 
https://pjchender.dev/javascript/js-event-loop-stack-queue/