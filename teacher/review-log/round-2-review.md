第 2 輪靜態複審結果：13 項修改大致已落地，網站同步內容也包含新版教材；但仍有 2 項發布前必要處理。全程只讀，未修改檔案、未執行教材中的安裝或操作流程。

## 🔴 一定要修（會讓學生卡住、資訊錯誤、規則衝突）

1｜`06-agent-skills/tutorial.md:614、616`；`05-review-loop/REVIEW-LOOP.md:123`｜7-2 仍只要求「另一個不同模型的 AI」，沒有要求「不同工具」。這和階段五剛統一的停止條件「不同 AI 工具，且使用不同模型」衝突；學生可能在同一工具切換模型後，以為已完成交叉審查｜兩處都改成「另一個 AI 工具，且使用不同模型」；完整跑一輪的說明也使用相同措辭｜這是本輪 #8 修改未完全涵蓋的新教材段落，會讓 review-loop skill 的示範標準和來源流程不同。

2｜`05-review-loop/REVIEW-LOOP.md:121-126`；`teacher/review-log/round-1-decision.md:29`；`teacher/README.md:65`｜修改後版本仍未實際跑過單元 6 課堂版、7-2 範例 2與 Apple Silicon macOS 安裝流程，不符合教材自己的停止條件第 3、4 項｜發布前至少完成並記錄：

- Apple Silicon Mac 從 Homebrew 到模組一～三的完整流程。
- 單元 6 課堂版：確認唯讀素材沒有被修改、改進計畫及修正版產生在正確位置。
- 7-2：至少由老師完整跑一輪 prompt → review 原文 → decision → 等待確認；不必改成學生必做。

｜本輪可以完成「修改後再審」，但靜態閱讀不能代替流程實測；目前仍不能依既定停止條件宣告完成。

## 🟡 建議修（不清楚、不一致、可以更好）

1｜`01-install/macos.md:6、26`；`AGENTS.md:104`｜課程已明訂不支援 Intel Mac，但安裝腳本仍寫「Intel Mac 可略過」，根規則仍介紹 Intel Homebrew 路徑｜把 `macos.md:26` 改成只描述 Apple Silicon；`AGENTS.md:104` 改成「本課程支援的 Apple Silicon Mac 使用 `/opt/homebrew`，仍應以 `command -v brew` 判斷，不要假設路徑」｜目前不會阻擋 Apple Silicon 學生，但會讓 AI 誤以為仍需處理 Intel 分支，與新支援政策不一致。

2｜`06-agent-skills/tutorial.md:609、612`｜學生若沒做 7-2 範例 1，備援審查目標是 `example/case05/paper.md`；這個檔案只有完成單元 5 後才存在，初始 repo 並沒有｜優先改成一定存在的 `example/case06/source/paper.md`，並註明它是唯讀的審查目標；也可保留 case05 作為完成單元 5 後的選項｜這正是第一輪單元 6 曾發生的「引用尚未產生檔案」問題，在 7-2 的備援路徑仍可能重現。

3｜`06-agent-skills/tutorial.md:439-449、478-485`｜課堂版只有第一段提供可直接貼上的完整提示詞；第二段要求學生自行替換三組路徑及補上一條唯讀規則｜另外提供一份完整的「課堂版第二段提示詞」，直接指定 `case06/source/paper.md`、`case06/source/figures/`、`case06/source/references.bib`，並明寫來源資料夾唯讀｜給初學者的教材若要求手動改寫提示詞，容易漏改路徑或誤寫來源檔；實測前尤其值得降低變因。

4｜`06-agent-skills/tutorial.md:18、439-449、478-485`｜課程表只給單元 6 十分鐘，但流程包含閱讀 274 行論文、2～3 輪互動、資料計算，以及可能的修稿與 PDF 輸出；目前不清楚十分鐘只做第一段，還是包含第二段｜若課堂只做到改進計畫，課程表明寫「只做第一段，第二段課後完成」；若要完成修稿，應在實測後調整時間｜靜態判斷時間偏緊，實際是否可行應由本輪實測決定。

5｜`06-agent-skills/README.md:24`｜資料夾內容仍只列 `case05/source/`、`case08/source/`、`case09/`，漏掉本輪新增的 `case06/source/`｜將 `case06/source/` 加入老師提供素材清單，並標示唯讀｜入口頁目前無法讓學生一眼看出課堂版論文已隨教材提供。

6｜`teacher/review-log/README.md:7`；`teacher/review-log/round-1-decision.md:8-24`｜統計寫「接受 10、部分接受 3、否決 2」，但逐項標記實際為「接受 11、部分接受 2、否決 2」｜確認哪一項原本預定為「部分接受」，修正該列標記；或將 README、commit 說明及統計改為 11／2／2｜審查紀錄是本課程要示範的可追溯流程，表格與逐項判斷應能互相核算。

已確認的部分包括：兩份 `REVIEW-LOOP.md` 內容相同、`case06/source/` 含論文／審稿／參考文獻／四張圖、唯讀規則已加入，網站產生頁也已同步顯示主要修改。

**結論：需要修改後再審**
