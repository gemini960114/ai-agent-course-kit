審查範圍涵蓋指定教材、三份 AGENTS.md、教師手冊、網站同步腳本與必要的目錄現況；沒有修改檔案。

## 🔴 一定要修

### 1｜Intel Mac 的 Homebrew 安裝流程目前走不通

- **位置：** [01-install/macos.md](/D:/antigravity/ai-agent-course-kit/01-install/macos.md:6)、[01-install/macos.md](/D:/antigravity/ai-agent-course-kit/01-install/macos.md:17)、[01-install/00-antigravity.md](/D:/antigravity/ai-agent-course-kit/01-install/00-antigravity.md:17)
- **問題：** 教材把 Intel Mac 列為可用平台，只提醒支援層級較低；但截至 2026-10-15，Homebrew 官方安裝腳本會在非 Apple Silicon 的 macOS 上直接中止。因此，全新 Intel Mac 按教材執行事前準備時會卡住。
- **建議怎麼改：** 發布前必須明確決定：
  - 若不支援 Intel：在總 README、Antigravity 安裝頁與 macOS 指南開頭明寫「本課程 macOS 僅支援 Apple Silicon」。
  - 若仍要支援 Intel：另外提供經 Intel 實機驗證的安裝流程，不可沿用目前的 Homebrew one-liner。
- **理由或證據：** Homebrew 的[官方安裝腳本](https://github.com/Homebrew/install/blob/main/install.sh)目前會檢查架構並拒絕非 `arm64` 的 macOS；官方[支援層級文件](https://docs.brew.sh/Support-Tiers)則把 Intel 列為 Tier 3，兩份官方資訊本身已有落差。Google 的[下載頁](https://antigravity.google/download)仍提供 Intel 版，但[Getting Started](https://www.antigravity.google/docs/getting-started/)又寫 x86 不受支援，更需要教材自行定義並實測支援矩陣。

### 2｜作業系統最低需求寫得過寬

- **位置：** [README.md](/D:/antigravity/ai-agent-course-kit/README.md:28)、[01-install/00-antigravity.md](/D:/antigravity/ai-agent-course-kit/01-install/00-antigravity.md:14)
- **問題：** 總覽只寫「Windows 10/11 或 macOS」，沒有寫 Windows 必須是 64 位元，也沒有 macOS 最低版本。學生可能下載完才發現無法安裝。
- **建議怎麼改：** 改成已驗證的完整需求，例如「Windows 10 64-bit 以上；macOS 12 以上，且本課程目前只驗證 Apple Silicon」。安裝頁也要在下載選項之前顯示。
- **理由或證據：** Google 官方列出的最低需求是 Windows 10 64-bit、macOS 12 以上；其中 Intel/x86 支援資訊又有前項所述的不一致。[Google Antigravity Getting Started](https://www.antigravity.google/docs/getting-started/)

### 3｜階段六的兩小時課程表引用了不存在的論文成果

- **位置：** [06-agent-skills/tutorial.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:18)，對照同檔「單元 6」[第 431–442 行](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:431)
- **問題：** 課程表在 0:35–0:45 安排單元 6，該單元要求讀取 `example/case05/paper.md` 與 `review.md`。但起始 repo 的 `case05` 只有 `source/` 素材，沒有這兩個檔案；它們必須先完成耗時的單元 5 才會產生。課程表前 35 分鐘只做單元 1、2，因此學生必然卡住。
- **建議怎麼改：** 三擇一：
  1. repo 預先提供一份固定的 case05 完成稿供課堂使用；
  2. 把單元 6 移出兩小時課堂，列為完成單元 5 後的課後練習；
  3. 改用課堂前面已產生的短文件做 brainstorming。
- **理由或證據：** 實際目錄只有 `source/data/`、`references.bib`、`apa.csl`，沒有 `paper.md` 或 `review.md`。這也與 [tutorial.md 第 5 行](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:5)所說的「依順序練習」不符。

### 4｜7-2 範例 2 在跳過範例 1 時無法完成第一步

- **位置：** [06-agent-skills/tutorial.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:576)、[同檔第 596 行](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:596)
- **問題：** 步驟 1 要學生用 Finder／檔案總管把文件複製到 `example/case07/`，但起始 repo 沒有 `case07`。第 596 行又明說可以不做範例 1，因此不能假設範例 1 已替學生建立該資料夾。Finder／檔案總管不能把檔案複製進不存在的目的資料夾。
- **建議怎麼改：** 在步驟 1 先寫「建立 `example/case07/` 資料夾」，或把空目錄用 `.gitkeep` 納入 repo。最好同時提供 Windows 與 macOS 的圖形介面步驟。
- **理由或證據：** repo 現況的 `example/` 只有 `case05`、`case08`、`case09`。

## 🟡 建議修

### 5｜7-2 並沒有完整測試剛做出的交叉審查 skill

- **位置：** [06-agent-skills/tutorial.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:581)、[同檔第 590–598 行](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:590)，對照 [05-review-loop/REVIEW-LOOP.md](/D:/antigravity/ai-agent-course-kit/05-review-loop/REVIEW-LOOP.md:21)
- **問題：**
  - 建立 skill 的提示詞只明列儲存 prompt 與 decision，沒有明列保存審查者原文 `round-N-review.md`，但這是階段五的三個核心紀錄之一。
  - 測試只驗證「產生第 1 輪 prompt」，沒有真的交給另一個 AI、貼回回覆、逐項判斷、等待使用者確認、套用或檢查停止條件。
  - 若審查者是網頁版 AI，測試沒有提醒把待審 `SKILL.md` 的內容附在 prompt 後面。
- **建議怎麼改：** 在 skill 規格中明列三份紀錄、外部審查者讀不到檔案時要附檔案內容、後續輪次要帶入已修正與已否決項目；測試至少完整跑完一輪。
- **理由或證據：** 現行測試只能證明自動觸發及 prompt 產生，不能證明整個 review loop 可運作。

### 6｜「skill 已預裝」與大量安裝／更新指令互相抵觸

- **位置：** [06-agent-skills/README.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/README.md:14)、[06-agent-skills/AGENTS.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/AGENTS.md:11)，對照 [tutorial.md 第 57–78 行](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:57)、[附錄](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:867)與[更新說明](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:846)
- **問題：** README 與 AGENTS.md 說 12 個 skill 已預裝、不得自行安裝或更新；tutorial 卻把每個安裝指令寫成可直接執行，還教學生更新、移除與「一次安裝全部」。學生照 tutorial 操作可能覆寫固定版本，導致全班成果不一致。
- **建議怎麼改：** 在單元 0 與每個安裝區塊上方醒目標示「課程 repo 已預裝，以下僅供離開本 repo 後參考，課堂不要執行」；把更新、移除與附錄移到「課後參考」。
- **理由或證據：** `npx skills` 官方確實支援 `-a`、`--copy`、`-g`、update 與 remove，但執行後會改變專案內容；參數本身沒有寫錯。[vercel-labs/skills 官方文件](https://github.com/vercel-labs/skills)

### 7｜階段六所需模組的說法不一致

- **位置：** [README.md](/D:/antigravity/ai-agent-course-kit/README.md:25)、[README.md](/D:/antigravity/ai-agent-course-kit/README.md:28)、[teacher/README.md](/D:/antigravity/ai-agent-course-kit/teacher/README.md:52)，對照 [06-agent-skills/README.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/README.md:13)
- **問題：** 總覽與教師清單只強調階段六前要裝模組三；階段六入口卻要求模組一～三。單元 3、7 的旁白與語音練習確實需要模組二的 `ffmpeg`、`edge-tts`。
- **建議怎麼改：** 統一成「完整做階段六需要模組一～三；只做兩小時核心課程時是否需要模組二，依實際課表另列」。
- **理由或證據：** 學生若只依總 README 準備，做到語音範例才會發現缺工具。

### 8｜階段五對「不同工具」與「不同模型」的停止條件不一致

- **位置：** [05-review-loop/REVIEW-LOOP.md](/D:/antigravity/ai-agent-course-kit/05-review-loop/REVIEW-LOOP.md:61)、[同檔第 123 行](/D:/antigravity/ai-agent-course-kit/05-review-loop/REVIEW-LOOP.md:123)、[exercise/ASSIGNMENT.md](/D:/antigravity/ai-agent-course-kit/05-review-loop/exercise/ASSIGNMENT.md:70)、[grade-stats/README.md](/D:/antigravity/ai-agent-course-kit/05-review-loop/exercise/grade-stats/README.md:45)
- **問題：** 有些位置要求不同模型，有些只要求不同工具。學生可用 Antigravity 與 Gemini 網頁版，但實際仍是相同模型，形式上符合「不同工具」卻違反本課程設定的交叉審查原則。
- **建議怎麼改：** 全部統一成「不同工具，且確認使用不同模型」；停止條件也使用同一措辭。
- **理由或證據：** 根 README 與教師手冊已明確選定「模型要不同」，練習入口不應放寬。

### 9｜GitHub 登入要求背景執行互動式命令，初學者不容易追蹤

- **位置：** [03-hello-github/README.md](/D:/antigravity/ai-agent-course-kit/03-hello-github/README.md:16)
- **問題：** `gh auth login --web` 是互動式瀏覽器流程；要求 AI「在背景執行」可能讓一次性代碼、開啟瀏覽器或等待輸入的狀態不明顯。
- **建議怎麼改：** 改成在可見的整合終端機執行，AI 停下來讓學生完成登入。若希望方便複製代碼，可使用官方提供的 `--clipboard`，但應先確認課堂環境允許剪貼簿操作。
- **理由或證據：** `--web` 的官方定義是開啟瀏覽器驗證；`--clipboard` 才是複製一次性代碼。[GitHub CLI `gh auth login` 文件](https://cli.github.com/manual/gh_auth_login)

### 10｜noreply 信箱設定說明不足，可能失去 commit 歸屬

- **位置：** [03-hello-github/README.md](/D:/antigravity/ai-agent-course-kit/03-hello-github/README.md:21)
- **問題：** 「用帳號名稱和 noreply 信箱設定」沒有交代現行格式。AI 很可能猜成 `USERNAME@users.noreply.github.com`；2017 年後建立的帳號通常使用 `ID+USERNAME@users.noreply.github.com`。
- **建議怎麼改：** 要求學生從 GitHub Email Settings 複製實際 noreply 地址，或明確讓 AI 查詢帳號 ID 後組合，不要猜格式。
- **理由或證據：** GitHub 官方說明了兩種格式及其適用條件。[GitHub Email addresses reference](https://docs.github.com/en/account-and-profile/reference/email-addresses-reference)

### 11｜`zh-TW-YunJheNeural`「暫不可用」是會過期的斷言

- **位置：** [06-agent-skills/tutorial.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/tutorial.md:538)、[06-agent-skills/AGENTS.md](/D:/antigravity/ai-agent-course-kit/06-agent-skills/AGENTS.md:65)
- **問題：** 教材直接宣稱臺灣男聲暫不可用，但沒有測試日期或 issue 來源；Microsoft 目前的官方聲音清單仍列出該聲音。edge-tts 的消費者端服務可能局部失效，但不能把一次實測寫成長期事實。
- **建議怎麼改：** 改成「截至 YYYY-MM-DD 的課前實測無法產生音訊；上課前以 `edge-tts --list-voices` 和實際產生檔案為準」。失敗時換聲音的處理可以保留。
- **理由或證據：** Microsoft 目前仍列有 `zh-TW-YunJheNeural`。[Microsoft Speech 語言與聲音清單](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=tts.)

### 12｜Windows 安裝無條件永久修改 CurrentUser 執行原則

- **位置：** [01-install/windows.md](/D:/antigravity/ai-agent-course-kit/01-install/windows.md:33)、[AGENTS.md](/D:/antigravity/ai-agent-course-kit/AGENTS.md:98)
- **問題：** 模組一尚未確認 `npm.ps1` 是否真的被擋，就用 `-Force` 把目前使用者的執行原則永久設為 `RemoteSigned`。教材其實已有 `npm.cmd`／`npx.cmd` 備援，未必需要先改系統設定。
- **建議怎麼改：** 優先檢查 `npm --version`；確實因執行原則失敗時，先使用 `.cmd`。若仍要修改 CurrentUser，應先說明影響並取得學生同意，不要無條件加 `-Force`。
- **理由或證據：** Microsoft 說明 CurrentUser 設定會持續存在，`-Force` 會抑制確認提示；Process scope 才只影響目前工作階段。[PowerShell Execution Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)、[`Set-ExecutionPolicy`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy)

### 13｜階段三沒有清楚交代從階段二切換工作資料夾

- **位置：** [02-organize-data/README.md](/D:/antigravity/ai-agent-course-kit/02-organize-data/README.md:20)、[03-hello-github/README.md](/D:/antigravity/ai-agent-course-kit/03-hello-github/README.md:11)
- **問題：** 階段二要求 IDE 只開 `02-organize-data`；階段三一開始就叫 AI 依 `AGENTS.md` 安裝／登入，卻沒有先說應開哪個資料夾。依序操作的學生此時仍在 `02-organize-data`，看不到根目錄 AGENTS.md。
- **建議怎麼改：** 在階段三最前面明寫登入步驟應在哪個 workspace 進行；或者移除「沒有才依 AGENTS.md 安裝」，改成回到階段一安裝指南。
- **理由或證據：** Antigravity 的規則是依 workspace 與目錄層級載入，不會自動讀取 workspace 外的根 AGENTS.md。[Google Antigravity Rules](https://www.antigravity.google/docs/rules/)

### 14｜階段二的查核量不足以支撐「每一格都有來源」

- **位置：** [02-organize-data/README.md](/D:/antigravity/ai-agent-course-kit/02-organize-data/README.md:5)、[同檔第 46–59 行](/D:/antigravity/ai-agent-course-kit/02-organize-data/README.md:46)
- **問題：** 學習目標要求比較表每一格都能在摘要找到來源，但實作只要求三欄各挑一格，再檢查少數已知陷阱。學生可能抓到預設陷阱，卻留下其他無來源內容。
- **建議怎麼改：** 把「抽查」與「完整驗證」分級：課堂至少每篇抽一列或用勾選表核對所有高風險欄位；作業提交前再要求所有格都有原文證據。
- **理由或證據：** 目前的操作要求與開頭宣告的完整性標準不相稱，會弱化「不要盲信 AI」的主軸。

### 15｜Antigravity 下載頁導引文字已過時

- **位置：** [01-install/00-antigravity.md](/D:/antigravity/ai-agent-course-kit/01-install/00-antigravity.md:11)
- **問題：** 教材說頁面最上方大按鈕是「Antigravity 2.0」，目前官方下載頁上方區塊名稱是「Antigravity app」。學生可能找不到教材所描述的文字。
- **建議怎麼改：** 不依賴頂端產品名稱，直接寫「往下找到 `Antigravity IDE (Standalone)`」；若要區別，可寫「不要選上方的 Antigravity app」。
- **理由或證據：** [目前的 Google 官方下載頁](https://antigravity.google/download)依序列出 Antigravity app、CLI、IDE extensions 與 `Antigravity IDE (Standalone)`。

## 已核對且沒有發現問題的部分

- Vite 所需 Node.js `20.19+`／`22.12+` 與官方目前要求一致。[Vite Getting Started](https://vite.dev/guide/)
- GitHub Free 的 private repo 不能使用 Pages、public repo 可以，教材說法正確。[GitHub Pages 官方文件](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- `05-review-loop/REVIEW-LOOP.md` 與練習資料夾內副本雜湊相同。
- 指定範圍內沒有找到失效的相對 Markdown 連結。
- Antigravity 使用 `AGENTS.md`、workspace skill 放在 `.agents/skills/` 的說法符合目前官方文件。[Rules](https://www.antigravity.google/docs/rules/)、[Agent skills](https://www.antigravity.google/docs/skills?tab=ide)
- 三份 AGENTS.md 的作用域設計整體合理；階段六「缺工具就停止、回階段一安裝」可視為更具體的子目錄規則，而不是和根規則衝突。

## 結論

**需要修改後再審。**

至少應先修正 Intel Mac 支援政策、階段六缺少的 `case05` 前置成果，以及單元 7-2 不存在的 `case07` 目的資料夾，再進行 macOS 實機與 7-2 完整一輪測試。
