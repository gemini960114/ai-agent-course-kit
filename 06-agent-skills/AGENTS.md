# AGENTS.md - AI 開發助理行為規範與環境指引

本專案與本機開發環境已完成標準化配置。所有 AI 助理（包括 Antigravity、Claude Code、Cursor、OpenCode 等）在協助開發、產生指令或執行任務時，**必須遵循以下規則**。

本規範同時適用 **Windows** 與 **macOS**。作業系統不同之處列於第 5 節；請先判斷目前的作業系統，再產生對應的指令。

> **本課程（Agent Skills）的練習規則**
>
> - 教材是 [tutorial.md](tutorial.md)。協助學生練習時不要修改它；只有使用者明確表示自己是老師、要修改教材時才可以改。
> - 練習的產出一律放在提示詞指定的 `example/caseXX/` 資料夾，不要寫到其他地方。過程中需要的暫存檔（例如擷取文字用的腳本、中間結果）也放在該 case 資料夾內，任務完成後刪除，不要留在專案根目錄。
> - 課程使用的 skill 已由老師預先安裝在 `.claude/skills/` 與 `.agents/skills/`。不要自行安裝、移除、修改或刪除這些 skill；唯一例外是使用者用 `skill-creator` 製作自己的新 skill 時，可以在這兩個資料夾建立該 skill。使用者明確要求加入 skill 時（例如練習 `find-skills`），使用 `npx skills add <owner>/<repo>@<skill> -a antigravity -a claude-code --copy -y`。
> - `example/case08/source/` 是老師提供的素材，只讀取、不要修改或刪除。
> - `example/case09/messy_files/`、`example/case09/extra_files/`、`example/case09/new_files/`、`example/case09/reference/` 是老師提供的素材，只讀取、不要修改、移動或刪除；整理結果一律複製到提示詞指定的新資料夾。
> - `example/case06/source/` 是老師提供的單元 6 課堂用論文，只讀取、不要修改或刪除。
> - `example/case05/source/` 是老師提供的資料（`data/`）、參考文獻（`references.bib`）與 APA 引用格式檔（`apa.csl`），只讀取、不要修改或刪除；分析結果存到提示詞指定的位置。
> - `example/case09/teacher/` 是老師的答案表。只有提示詞明確指定時才可以讀取（例如核對步驟），盤點與分類時不要讀取或參考。

---

## 1. 系統既有環境與可用工具

以下工具已在階段一（教材的 `01-install/`）安裝。執行任務時使用這些工具，不要自行安裝、更新或改用其他工具替代。

使用前若不確定某工具是否存在，先檢查（Windows：`Get-Command <指令>`；macOS：`command -v <指令>`）。**確實缺少時，告訴使用者缺少哪個工具，請使用者回到教材的 `01-install/` 依安裝指南安裝，然後停下來**，不要自行安裝。

### 核心開發

- **Git**：版本控制
- **uv**：現代化極速 Python 套件與虛擬環境管理器
- **Node.js** (`node`, `npm`, `npx`)：JavaScript/TypeScript 執行環境
- **GitHub CLI (`gh`)**：GitHub 遠端操作

### 多媒體與命令列工具

- **ffmpeg**：影音轉檔、串流與音訊處理
- **edge-tts**：高品質微軟神經網路語音合成（TTS）
- **yt-dlp**：影音下載與串流擷取
- **ripgrep (`rg`)**：極速程式碼與文件搜尋工具
- **jq**：命令列 JSON 剖析與過濾器
- **ImageMagick (`magick`)**：影像批次處理

### 文件轉換

- **pandoc**：多格式文件轉換器（Markdown、Word、HTML 等）
- **LaTeX**：排版與 PDF 輸出（Windows：MiKTeX；macOS：MacTeX）。編譯含中文的文件一律使用 `xelatex`。

---

## 2. Python 專案開發規範（重要 ⭐️）

1. **不要使用全域 `pip install`**，也不要要求使用者另外下載安裝 Python。
2. **一律透過 `uv` 執行 Python**：
   - 執行腳本：`uv run python script.py`（不需手動啟用虛擬環境）。
   - 腳本需要套件時：`uv run --with <package> python script.py`，套件只在執行時使用，不會裝進系統。
   - 新專案：`uv init`，再用 `uv add <package>` 加入依賴（記錄於 `pyproject.toml`）。
   - 既有 `requirements.txt` 專案：`uv venv` 建立虛擬環境，再 `uv pip install -r requirements.txt`。
   - 若需手動啟用虛擬環境：見第 5 節。

---

## 3. 多媒體與 AI 任務規範

1. **語音生成（文字轉語音）**：
   - 優先使用 `edge-tts`（例如：`edge-tts --voice zh-TW-HsiaoChenNeural --text "內容" --write-media output.mp3`），避免呼叫高成本或需複雜設定的第三方 API。可用 `edge-tts --list-voices` 查詢語音。
   - edge-tts 依賴微軟的線上服務，偶爾會失效（出現 403 錯誤），通常是版本太舊。遇到時告知使用者執行 `uv tool upgrade edge-tts` 更新後再試，**不要反覆重試**，也不要自行更新；需要音效時可改用 `ffmpeg` 合成。
   - 個別聲音也可能暫時無法使用（例如 `zh-TW-YunJheNeural` 曾經發生過），出現「No audio was received」時改用其他聲音，例如 `zh-TW-HsiaoChenNeural`、`zh-TW-HsiaoYuNeural`。
2. **影音與音訊剪輯**：
   - 底層處理優先使用 `ffmpeg` 命令。
3. **影音下載與擷取**：
   - 優先使用 `yt-dlp`。
4. **文件處理與轉換**：
   - 讀取、建立或編輯 Word、PowerPoint、Excel、PDF 檔案時，依對應的 skill（`docx`、`pptx`、`xlsx`、`pdf`）處理。
   - Markdown、HTML、LaTeX 之間的格式轉換，優先使用 `pandoc`。
   - 輸出 PDF 時以 `xelatex` 為引擎，含中文需指定中文字型（字型名稱見第 5 節），例如：`pandoc input.md -o output.pdf --pdf-engine=xelatex -V CJKmainfont="Microsoft JhengHei"`。
   - 撰寫 LaTeX 文件（例如 arXiv 論文格式）時，用 `xelatex` 編譯；需要參考文獻時依序執行 `xelatex` → `bibtex` → `xelatex` → `xelatex`。
   - 編譯時 Windows 的 MiKTeX 可能會自動下載缺少的 LaTeX 套件，這是正常現象；不要改用其他 TeX 引擎（例如 Tectonic）。

---

## 4. 程式碼搜尋與檢視規範

1. **專案全文搜尋**：
   - 優先使用 `rg <關鍵字>`（ripgrep），嚴禁使用 Windows 慢速遞迴搜尋或 `find` 全碟掃描。
   - `rg` 預設略過隱藏檔（如 `.git`），在 Git 儲存庫內會遵守 `.gitignore`；不在 Git 儲存庫時需以 `-g '!node_modules/**'` 手動排除大型目錄。
2. **JSON 資料處理**：
   - 終端機處理 API 回傳值或 JSON 檔案時，優先搭配 `jq` 進行排版與篩選。

---

## 5. 作業系統差異

| 項目 | Windows | macOS |
| --- | --- | --- |
| 命令列 | PowerShell | zsh |
| 檢查工具是否存在 | `Get-Command <指令>` | `command -v <指令>` |
| 手動啟用虛擬環境 | `.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| 中文 PDF 字型 | `Microsoft JhengHei` | `Songti TC`（或 `Heiti TC`） |
| LaTeX 發行版 | MiKTeX | MacTeX |

### Windows 注意事項

1. 若執行 `npm` / `npx` 被執行原則擋下，改用 `npm.cmd` / `npx.cmd`，不要自行修改執行原則。
2. 產生的路徑與檔案指令應相容於 Windows 環境（注意路徑反斜線 `\` 與引號處理）。

### macOS 注意事項

1. 不要使用 `sudo` 執行指令。
2. MacTeX 的指令位於 `/Library/TeX/texbin`；若找不到 `xelatex`，請使用者開新的終端機視窗再試。
