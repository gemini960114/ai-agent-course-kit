# 階段一：安裝開發環境

照下面四個步驟完成。第 3 步的模組一約 15～30 分鐘；模組二、三可以課後安裝。Windows 和 macOS 的模組編號相同，上課時可以直接說「請安裝模組一」。

| 步驟 | 做什麼 | 說明 |
| --- | --- | --- |
| 第 1 步 | 安裝並啟動 Antigravity IDE（手動） | [00-antigravity.md](00-antigravity.md) |
| 第 2 步 | 在 Antigravity 的終端機下載教材，並開啟教材資料夾 | [本頁](#第-2-步取得教材) |
| 第 3 步 | 請 AI 安裝軟體（模組一～三） | [本頁](#第-3-步安裝軟體) |
| 第 4 步 | 調整版面、安裝其他 AI 擴充功能（建議） | [01-layout.md](01-layout.md) |

---

## 第 1 步：安裝並啟動 Antigravity IDE

見 [00-antigravity.md](00-antigravity.md)。有了 AI 編輯器，後面的軟體才能交給 AI 安裝。

## 第 2 步：取得教材

後面的安裝 Prompt 和練習都需要教材檔案在你的電腦上。

1. 在 Antigravity IDE 開啟終端機：選單「終端機 → 新增終端機」（Terminal → New Terminal）。
2. 確認電腦上有沒有 Git：

   ```powershell
   git --version
   ```

3. **有顯示版本號**（例如 `git version 2.x`）：用 Git 下載教材到「文件」資料夾。

   ```powershell
   cd ~/Documents
   git clone https://github.com/gemini960114/ai-agent-course-kit
   ```

   **找不到 git 指令**（第一次上課的 Windows 電腦通常沒有，Git 會在第 3 步的模組一安裝）：改下載 [ZIP 檔](https://github.com/gemini960114/ai-agent-course-kit/archive/refs/heads/main.zip)，解壓縮到「文件」。Windows：在檔案上按右鍵 →「解壓縮全部」；macOS：連按兩下。

   > macOS 輸入 `git` 時，可能跳出安裝「命令列開發者工具」的視窗。按「安裝」，等它完成後再執行一次 `git --version`。第 3 步的 Homebrew 也需要這個工具。

4. 開啟教材資料夾：選單「檔案 → 開啟資料夾」（File → Open Folder），選「文件」裡的 `ai-agent-course-kit`（下載 ZIP 的是 `ai-agent-course-kit-main`）。開啟的是**教材的最上層資料夾**，不是裡面的某個階段。

## 第 3 步：安裝軟體

| 模組 | 內容 | Windows | macOS |
| --- | --- | --- | --- |
| 模組一（核心開發） | Git、uv、Node.js、GitHub CLI (`gh`) | WinGet | Homebrew |
| 模組二（多媒體與進階 CLI） | ffmpeg、ripgrep (`rg`)、jq、ImageMagick、edge-tts、yt-dlp | WinGet + uv tool | Homebrew + uv tool |
| 模組三（文件轉換） | Pandoc、LaTeX（Windows：MiKTeX；macOS：MacTeX） | WinGet | Homebrew |

把下方的 Prompt 貼給 Antigravity 的 AI，AI 會依你的作業系統選擇對應的安裝指南。

**三個 Prompt 怎麼選：**

- **Prompt 1 和 Prompt 2 二選一。** Prompt 2 已經包含模組一；上課時間有限就先用 Prompt 1，模組二課後再補。
- **Prompt 3 另外執行**，但要在完成 Prompt 1 或 2 之後才貼（macOS 需要模組一準備好的 Homebrew）。階段六之前裝好即可。

### Prompt 1：模組一（核心開發，必裝）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
執行其中的「模組一：核心開發工具」（macOS 若尚未安裝 Homebrew，請先完成「事前準備」）：
1. 先檢查 Git、uv、Node.js、gh 是否已存在。
2. 已安裝的項目請列出版本並略過；缺少的項目才透過 WinGet（Windows）或 Homebrew（macOS）安裝。
3. 全部嘗試完成後，若有任何一項失敗，請列出失敗項目與錯誤訊息，不要回報成功。
4. 安裝完成後重載環境變數並執行版本驗證回報。
```

### Prompt 2：模組一與模組二（核心 + 多媒體與進階 CLI）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
幫我檢查並安裝模組一與模組二：
- 系統原生工具（Git、uv、Node.js、gh、ffmpeg、ripgrep (rg)、jq、ImageMagick (magick)）請透過 WinGet（Windows）或 Homebrew（macOS）安裝。
- Python 工具（edge-tts, yt-dlp）請在 uv 安裝完成後透過 uv tool 安裝。
- 已存在的工具跳過，缺少的才安裝；套件名稱以安裝指南中的清單為準。
- 全部嘗試完成後，若有任何一項失敗，請列出失敗項目與錯誤訊息，不要回報成功。
- 完成後重載 PATH，並回報所有工具的版本狀態。
```

### Prompt 3：模組三（文件轉換，Pandoc、LaTeX）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
執行其中的「模組三：文件轉換工具」：
1. 先檢查 pandoc、xelatex 是否已存在，缺少才安裝。
2. 安裝失敗時請列出錯誤訊息，不要回報成功。
3. 完成後重載 PATH，回報 pandoc 與 xelatex 版本，並執行指南中的 Word 轉檔與中文 PDF 輸出測試。
```

### 不透過 AI，手動安裝

開啟 **Windows PowerShell** 或 macOS **終端機**，照安裝指南把程式碼區塊整段複製貼上執行即可：

- **Windows**：[windows.md](windows.md)（Windows 10 請先確認 WinGet 可用，見文件中的「事前確認」）
- **macOS**：[macos.md](macos.md)（需先完成文件中的「事前準備」安裝 Homebrew）

## 第 4 步：調整版面與安裝 AI 擴充功能（建議）

見 [01-layout.md](01-layout.md)：把 AI 面板和終端機放到右側，並可選擇安裝 Codex、Claude Code 等 AI agent 擴充功能。這一步不影響後面的練習，可以之後再做。

---

## AGENTS.md 的生效範圍

教材最上層的 [AGENTS.md](../AGENTS.md) 是寫給 AI 的規則（例如 Python 一律用 uv、不全域安裝套件）。不同 AI 工具讀取的規則檔不同：

| AI 工具 | 專案規則 | 全域規則（Windows / macOS） |
| --- | --- | --- |
| Antigravity | 直接讀取 `AGENTS.md` | 請依官方文件設定 |
| Claude Code | 建立 `CLAUDE.md`，內容只寫一行 `@AGENTS.md`（最穩定；部分版本在沒有 `CLAUDE.md` 時也會直接讀取 `AGENTS.md`） | `%USERPROFILE%\.claude\CLAUDE.md` / `~/.claude/CLAUDE.md` |
| Cursor | 直接讀取 `AGENTS.md` | Settings → Rules → User Rules |
| OpenCode | 直接讀取 `AGENTS.md` | `~/.config/opencode/AGENTS.md` |
| Gemini CLI | 建立 `GEMINI.md`，內容寫 `@AGENTS.md` | `%USERPROFILE%\.gemini\GEMINI.md` / `~/.gemini/GEMINI.md` |

> 複製到全域規則檔時，AGENTS.md 裡指向 `01-install/windows.md`、`01-install/macos.md` 的相對連結會失效，請改成這兩份文件在你電腦上的完整路徑。
