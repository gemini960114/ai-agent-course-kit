# 第 1 輪判斷

審查者：另一個 AI 工具（與產出者 Claude Opus 不同模型）
判斷與修改：Claude Code（Claude Opus），經老師確認後套用

| # | 建議 | 判斷 | 理由（怎麼驗證的） |
| --- | --- | --- | --- |
| 1 | Intel Mac 的 Homebrew 安裝走不通 | ✅ 接受 | 讀取 Homebrew 官方 install.sh，確認有 `abort "Homebrew on macOS is only supported on Apple Silicon processors!"`；Antigravity 官方 Getting Started 也寫「x86 is not supported」。老師決定：本課程 macOS 只支援 Apple Silicon，寫進 README、00-antigravity.md、macos.md 與教師手冊 |
| 2 | 作業系統最低需求寫得太寬 | ✅ 接受 | Antigravity 官方 Getting Started：Windows 10 64 位元、macOS 12（Monterey）以上。寫進 README 與 00-antigravity.md 的下載說明之前 |
| 3 | 兩小時課程表的單元 6 需要單元 5 的論文 | ✅ 接受 | 確認 `example/` 原本只有 case05/source、case08、case09。老師選擇做法 1：把單元 5 的實際產出（paper.md、review.md、references.bib、figures/）放在 `example/case06/source/`，單元 6 加上課堂版提示詞，課程表註明使用課堂版 |
| 4 | 7-2 範例 2 的 case07 資料夾不存在 | ✅ 接受 | 確認 repo 沒有 case07。步驟 1 加上建立資料夾的 Windows 與 macOS 操作 |
| 5 | 7-2 沒有完整測試 review-loop skill | ⚠️ 部分接受 | skill 規格補上 REVIEW-LOOP.md 原有的三點：保存審查原文 round-N-review.md、審查者讀不到檔案時附上內容、後續輪次帶入已決定項目。完整跑一輪需要第二個 AI 與較長時間，改為「有時間再做（選做）」，不列為必做 |
| 6 | 「已預裝」與教材中的安裝／更新指令抵觸 | ✅ 接受 | 單元 0「安裝指令說明」與附錄加註：課程已裝好，課堂上不要執行，指令供離開本課程後參考 |
| 7 | 階段六需要的模組說法不一 | ✅ 接受 | 單元 3、7 使用 edge-tts 與 ffmpeg（模組二）。README、教師手冊統一為階段六需要模組二、三 |
| 8 | 「不同工具」與「不同模型」不一致 | ✅ 接受 | 確認步驟 ③ 寫不同模型、停止條件與 ASSIGNMENT 只寫不同工具。統一為「不同工具，且使用不同模型」；REVIEW-LOOP.md 兩份副本同步修改並以 cmp 確認相同 |
| 9 | gh 登入不要在背景執行 | ❌ 否決 | AI 的終端機遇到互動式指令會卡住，背景執行才能讓 AI 讀到一次性代碼轉告學生；提示詞已寫明由學生自己到瀏覽器輸入。改成前景執行反而會讓 AI 停在等待。**未在課堂實測**，若實際上課發現學生卡住再重新評估 |
| 10 | noreply 信箱格式要正確 | ✅ 接受 | 2017 年後建立的帳號使用 `ID+帳號@users.noreply.github.com`。提示詞改成用 `gh api user` 查出 id 與 login 再組合 |
| 11 | YunJhe「暫不可用」會過時 | ✅ 接受 | 2026-10-15 實測 `edge-tts --voice zh-TW-YunJheNeural` 成功產生 11 KB 音檔。改成「曾經暫時無法產生語音，課前實測確認」，保留失敗時換聲音的處理 |
| 12 | 不要無條件修改 CurrentUser 執行原則 | ❌ 否決 | 05 示範案例第 2 輪已否決同樣的建議：刪除後學生執行 `npm` 會報錯，且同一輪另一位審查者意見相反。只設定 CurrentUser 的 RemoteSigned，指南已註明只影響目前使用者。下一輪 prompt 應把它列入「已決定的事」 |
| 13 | 階段三沒交代要開哪個資料夾 | ✅ 接受 | 階段二只開 `02-organize-data`，讀不到根目錄 AGENTS.md。階段三開頭加上開啟教材最上層資料夾；提示詞改成缺 gh 時停下來，請學生回階段一安裝 |
| 14 | 階段二抽查量不足以支撐「每一格都有出處」 | ⚠️ 部分接受 | 30 分鐘內無法逐格核對，課堂維持抽查。開頭補充：課堂用抽查練習找錯的方法，實際使用比較表前要逐格核對，讓目標與做法一致 |
| 15 | Antigravity 下載頁說明過時 | ✅ 接受 | 讀取官方下載頁，上方區塊為「Antigravity app」。改成「不要選上方的 Antigravity app，往下找到 Antigravity IDE (Standalone)」 |

統計：接受 10 項、部分接受 3 項、否決 2 項、已處理 0 項

## 下一輪要注意

- 第 2 輪 prompt 的「已決定的事」加入：macOS 只支援 Apple Silicon、單元 6 使用老師提供的課堂版論文、執行原則維持 CurrentUser RemoteSigned（#12）、gh 登入在背景執行（#9）。
- 尚未完成的驗證：macOS 實機測試、7-2 範例 2 實際跑一次、單元 6 課堂版實際跑一次。
