# 階段六：Agent Skills

約 2 小時（課堂）＋課後自學。

Skill 是寫給 AI 的工作說明書：告訴它某一類任務該怎麼做、要遵守哪些規範、可以用哪些工具。這個階段用 12 個精選 skill 做出產品頁、海報、影片、研究論文、Office 文件，最後把整理文件的流程做成自己的 skill。

**重點：skill 讓 AI 照一套整理好的經驗做事，但它照做不代表做對。每個範例做完都要自己核對成果。**

---

## 開始之前

1. 完成 [階段一](../01-install/README.md) 的模組一、二，再安裝模組三（LaTeX，單元 5 輸出 PDF 需要）。在教材的最上層資料夾（不是 `06-agent-skills/`），把下面這段貼給 Antigravity 的 AI：

   ```text
   請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
   執行其中的「模組三：LaTeX」：
   1. 先檢查 xelatex 是否已存在，缺少才安裝。
   2. 安裝失敗時請列出錯誤訊息，不要回報成功。
   3. 完成後重載 PATH，回報 xelatex 版本，並執行指南中的中文 PDF 輸出測試。
   ```

   MacTeX 下載達數 GB，Mac 請在家中網路先裝好。
2. 在 Antigravity IDE 選「檔案 → 開啟資料夾」（File → Open Folder），開啟**這個資料夾** `06-agent-skills/`（不是教材的最上層資料夾）。課程用的 skill 已經放在這裡的 `.agents/skills/` 與 `.claude/skills/`，只有開啟這個資料夾時才會被載入。
3. 打開 [tutorial.md](tutorial.md)，從「0. 先備知識」開始，依順序練習。

## 資料夾內容

| 項目 | 說明 |
| --- | --- |
| [tutorial.md](tutorial.md) | 教材：每個 skill 的用途與可直接照抄的提示詞 |
| [AGENTS.md](AGENTS.md) | 這個階段給 AI 的規則（練習產出放哪裡、哪些素材不能改） |
| `.agents/skills/`、`.claude/skills/` | 老師預先安裝的 skill（Antigravity 與 Claude Code 各一份） |
| `example/` | 練習產出的位置；`case05/source/`、`case06/source/`（單元 6 課堂用論文）、`case08/source/`、`case09/` 內有老師提供的素材，都只能讀取、不要修改 |
| [install.sh](install.sh) | 重新安裝課程 skill 的指令清單（一般不需要執行） |
