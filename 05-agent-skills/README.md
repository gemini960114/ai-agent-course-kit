# 階段五：Agent Skills

約 2 小時（課堂）＋課後自學。

Skill 是寫給 AI 的工作說明書：告訴它某一類任務該怎麼做、要遵守哪些規範、可以用哪些工具。這個階段用 12 個精選 skill 做出產品頁、海報、影片、研究論文、Office 文件，最後把整理文件的流程做成自己的 skill。

**重點：skill 讓 AI 照一套整理好的經驗做事，但它照做不代表做對。每個範例做完都要自己核對成果。**

---

## 開始之前

1. 完成 [階段一](../01-install/README.md) 的模組一～三。第 5 節輸出 PDF 需要模組三的 LaTeX。
2. 在 Antigravity IDE 選「檔案 → 開啟資料夾」（File → Open Folder），開啟**這個資料夾** `05-agent-skills/`（不是教材的最上層資料夾）。課程用的 skill 已經放在這裡的 `.agents/skills/` 與 `.claude/skills/`，只有開啟這個資料夾時才會被載入。
3. 打開 [tutorial.md](tutorial.md)，從「0. 先備知識」開始，依順序練習。

## 資料夾內容

| 項目 | 說明 |
| --- | --- |
| [tutorial.md](tutorial.md) | 教材：每個 skill 的用途與可直接照抄的提示詞 |
| [AGENTS.md](AGENTS.md) | 這個階段給 AI 的規則（練習產出放哪裡、哪些素材不能改） |
| `.agents/skills/`、`.claude/skills/` | 老師預先安裝的 skill（Antigravity 與 Claude Code 各一份） |
| `example/` | 練習產出的位置；`case05/source/`、`case08/source/`、`case09/` 內有老師提供的素材 |
| [install.sh](install.sh) | 重新安裝課程 skill 的指令清單（一般不需要執行） |
