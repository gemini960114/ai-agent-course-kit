# AI Agent 協作開發與研究

> 不只聊天：讓 AI Agent 和你一起開發與研究

📖 **教學網站：<https://gemini960114.github.io/ai-agent-course-kit/>**

以 Antigravity 作為 AI Agent 工具，透過文獻整理、GitHub、網頁開發與交叉審查等實作，學習運用 AI Agent、檢查產出，並把工作流程寫成 Skills。

## 課程地圖

| 階段 | 你會做出 | 你會遇到的 AI 錯誤 | 時間 |
| --- | --- | --- | --- |
| [01 安裝環境](01-install/README.md) | 能和 AI 協作的開發環境 | — | 15～30 分 |
| [02 AI 整理文獻](02-organize-data/README.md) | 一張論文比較表 | 補寫摘要沒有的樣本數和結果 | 30 分 |
| [03 連線 GitHub](03-hello-github/README.md) | 第一個推上 GitHub 的程式 | — | 30 分 |
| [04 網頁小遊戲](04-web-game/README.md) | 一個能玩、能分享的網頁遊戲 | 說「做好了」，不代表沒有 bug | 30～40 分 |
| [05 AI 交叉審查](05-review-loop/README.md) | 經過多輪審查的成績統計程式 | 審查 AI 很有自信地給出錯誤建議 | 90 分～2 × 90 分 |
| [06 Agent Skills](06-agent-skills/README.md) | 產品頁、海報、研究論文、整理好的會議文件，以及自己做的 skill | 照著 skill 做，不代表成果正確 | 2 小時＋課後自學 |
| [07 AI 指揮官](07-hpc-demo/README.md)（老師示範） | （示範）指揮 AI 操作國網中心超級電腦 | 謊報「15/15 完成」、自行修改程式 | 20～30 分 |

## 開始

先照 [階段一](01-install/README.md) 的四個步驟準備環境：

1. 安裝並啟動 Antigravity IDE：[01-install/00-antigravity.md](01-install/00-antigravity.md)
2. 在 Antigravity 的終端機用 `git clone https://github.com/gemini960114/ai-agent-course-kit` 下載教材，並開啟教材資料夾。還沒有 Git 的電腦改下載 [ZIP 檔](https://github.com/gemini960114/ai-agent-course-kit/archive/refs/heads/main.zip)，解壓縮到「文件」（資料夾名稱為 `ai-agent-course-kit-main`）
3. 請 AI 安裝軟體，至少裝好模組一。模組二、三可以課後安裝，階段六之前要裝好
4. （建議）調整版面、安裝其他 AI 擴充功能：[01-install/01-layout.md](01-install/01-layout.md)

接著從 [02 AI 整理文獻](02-organize-data/README.md) 開始，依課程地圖往下做。階段六要另外開啟 `06-agent-skills/` 資料夾，見 [06-agent-skills/README.md](06-agent-skills/README.md)。

需要：Windows 10／11（64 位元）或 macOS 12 以上的 Apple Silicon（M 系列晶片）Mac（Intel Mac 不支援，見 [00-antigravity.md](01-install/00-antigravity.md)）、Google 帳號（登入 Antigravity）、GitHub 帳號（階段三起）；階段五另外需要第二個 AI（例如 ChatGPT 網頁版，模型要和 Antigravity 使用的不同）；階段六需要模組二（語音、影音）與模組三（LaTeX 輸出 PDF）。

---

**學習路徑建議：** 依科系背景與可用時間選擇路線，見 [teacher/README.md](teacher/README.md#學習路徑建議)。上課前檢查清單、參考答案與示範腳本也在同一份文件。

**關於 [AGENTS.md](AGENTS.md)：** 給 AI 的規則，用 Antigravity IDE 開啟這個資料夾時會自動套用。`06-agent-skills/` 有自己的 AGENTS.md。
