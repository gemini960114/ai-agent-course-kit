# 延伸閱讀：用 superpowers 依清單修正專案

> 課後自學，不在課堂時間內。適用：能分派 subagent 的 AI 工具（例如 Claude Code）；Antigravity 尚未實測，見文末。

[superpowers](https://github.com/obra/superpowers) 是一套規範 AI **做事流程**的 skill。單元 6 的 `brainstorming` 就出自這裡。其他 skill 讓 AI 照「計畫 → 測試 → 修改 → 驗證 → 審查」的順序做事，正好呼應本課程的主軸：AI 會出錯，要檢查。

---

## 什麼時候用

最划算的時機：**專案已經成形，手上有一份問題清單，要逐項修正。** 例如審查報告、bug 清單，或階段五交叉審查後你決定接受的建議。

| 適合 | 不適合 |
| --- | --- |
| 改動跨好幾個檔案，可以拆成幾個獨立的任務 | 只改一兩行的小修正（流程的成本比修正還高） |
| 每項都能用測試或實際執行來驗證 | 還在探索、做原型，方向常常改 |
| 做錯的代價高（例如資料算錯、重複計費） | 一次性的小腳本、沒辦法驗證的文件修改 |

## 建議流程

以階段五的 grade-stats 為例。練習的位置是你複製到「文件」的 `grade-stats`，**不要**在教材資料夾或 `06-agent-skills/` 裡做。

### 第 1 步：審查，產出問題清單（最好用另一個 AI 工具或不同模型）

```text
請審查這個專案，把問題寫成 report.md：每項給編號、嚴重度（高／中／低）、
位置、問題、建議；標明是實際執行重現的，還是讀程式碼推得的。先不要修改任何檔案。
```

> 做過階段五的話，`review-log/` 裡的審查意見和你的判斷，就是現成的清單，可以跳過這一步，改成「依 review-log 中我接受的項目」。

### 第 2 步：你自己讀 `report.md`，刪掉不同意的項目

### 第 3 步：寫修正計畫

```text
請用 writing-plans，依 report.md 寫修正計畫：拆成可以獨立驗證的任務，
每個任務註明對應的編號和要先寫的測試；需要我決定的事情先列出來問我。
```

> grade-stats 原本沒有測試，計畫裡會包含用 `uv add --dev pytest` 加入測試工具。

### 第 4 步：你確認計畫

### 第 5 步：依計畫逐項修正

```text
請用 subagent-driven-development 在新分支上依計畫逐項修正，
每個任務先寫會失敗的測試，修完確認通過再 commit。
```

### 第 6 步：全部完成後，請另一個 AI 審查分支，你確認後再合併

第 2、4、6 步由你把關，是這套流程不可少的部分。AI 負責把清單有紀律地做完，**清單的內容對不對、要不要合併，由人決定**。這也是階段五教的事。

## 安裝

在**你的專案資料夾**（例如 `grade-stats`）的終端機執行，skill 會裝在這個專案裡，不影響其他專案和課程的 12 個 skill。一次一行：

```bash
npx skills add obra/superpowers@writing-plans -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@subagent-driven-development -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@executing-plans -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@test-driven-development -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@using-git-worktrees -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@requesting-code-review -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@verification-before-completion -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@systematic-debugging -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@finishing-a-development-branch -a antigravity -a claude-code --copy -y
```

| 參數 | 意思 |
| --- | --- |
| `obra/superpowers@<名稱>` | 從 GitHub 的 `obra/superpowers` 安裝指定的 skill |
| `-a antigravity -a claude-code` | 同時安裝給 Antigravity 與 Claude Code |
| `--copy` | 複製檔案（Windows 不支援捷徑連結時也能用） |
| `-y` | 跳過確認 |

- 你只需要叫用 `writing-plans` 和 `subagent-driven-development`，其他 skill 是它們執行時會自動用到的。
- 安裝完成後重新啟動 AI 工具的工作階段，再用 `npx skills list` 確認。
- 想看這套 skill 的完整清單：`npx skills add obra/superpowers --list`（只列出，不安裝）。
- Windows 執行 `npx` 被擋時，改用 `npx.cmd`（見 [AGENTS.md](../AGENTS.md) 第 5 節）。

> **不要安裝 `using-superpowers`。** 它要求 AI 在任何回應之前都先找 skill 來用，會接管整段對話：請它做個小修改，也會先進入討論和計畫流程，回應變慢、也更耗 token。

用完可以移除：

```bash
npx skills remove writing-plans subagent-driven-development executing-plans test-driven-development using-git-worktrees requesting-code-review verification-before-completion systematic-debugging finishing-a-development-branch -y
```

## 實例：修正一組自製 skill

老師用這套流程修正自己寫的三個「文件 → 動畫簡報 → 講解影片」skill：

1. **審查**：三個 subagent 用合成資料實際執行三個 skill（路徑刻意包含中文和空格），找出高、中、低風險的問題，每項都有編號，並標明是實測重現還是讀程式碼推得。
2. **計畫**：拆成 13 個任務，每個任務註明對應的編號和要先寫的測試；需要老師決定的事情（例如要用哪個配音聲音）先列出來問。
3. **執行**：每個任務交給一個 subagent，先寫會失敗的測試，再修正、確認通過、commit；每個任務完成後，另派一個 subagent 審查。全程在新分支上進行，不動主分支。
4. **結果**：約 35 分鐘完成前 9 個任務，測試從 3 個增加到 59 個。

最值得注意的一次：計畫要求把字幕裡的 `\` 改成 `\\`，但 AI 實際算出一張影片畫面，發現字幕引擎不支援這種寫法，於是改用別的方法，並在紀錄裡寫下理由和「判斷錯了的代價」。**它沒有照計畫硬做，而是先驗證、再修改。**

這也提醒我們：測試全部通過，代表 AI 寫的測試通過，不代表修正一定正確。第 6 步的審查與合併前的確認，還是要由人來做。

## 尚未實測

- `subagent-driven-development` 需要 AI 工具能分派 subagent（例如 Claude Code）。在 Antigravity 上能不能照樣運作還沒確認。不能分派時，可以改請 AI 用 `executing-plans`，由同一個 AI 依序完成每個任務。
