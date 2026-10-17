# Agent Skills 教學：12 個精選 Skills 與使用範例

> 適用：Claude Code、Antigravity
> 內容：每類 skill 的安裝指令、用途說明，以及**可直接照抄的提示詞範例**
> 練習方式：每個範例的產出都放在 `example/caseXX/`；大多數範例不需要事先準備檔案，少數範例（單元 5、單元 6 課堂版、單元 8 範例、單元 9 實作）使用老師提供的素材，會在範例中註明。有些範例會沿用前面範例的成果，請依順序練習。

---

## 課程時間規劃（2 小時）

課堂上做下表的範例，其餘範例留到課後自學。Agent 的執行時間有快有慢，每段時間都已預留緩衝。

| 時間 | 內容 | 練到的 Skill |
| --- | --- | --- |
| 0:00–0:10 | 開場：什麼是 skill、確認 skill 已就緒、怎麼看 skill 有沒有被用到（單元 0） | — |
| 0:10–0:25 | 單元 1 範例 1：有個性的產品頁，完成後驗證觸發 | `frontend-design` |
| 0:25–0:35 | 單元 2 範例 1：幫同一個品牌做宣傳海報 | `canvas-design` |
| 0:35–0:45 | 單元 6 第一段：用課堂版提示詞討論老師提供的論文，產出改進計畫（第二段修稿留到課後） | `brainstorming` |
| 0:45–1:20 | 單元 9 實作步驟 1～3：盤點、整理、核對會議文件 | `docx`、`pdf`、`pptx`、`xlsx`（自動觸發） |
| 1:20–1:50 | 單元 9 實作延伸 A：把整理流程做成自己的 skill，換一批檔案測試 | `skill-creator` |
| 1:50–2:00 | 總結與課後練習說明 | — |

**課後自學**

| 內容 | 說明 |
| --- | --- |
| 單元 1、2 範例 2 | 和範例 1 性質相近，可加深印象 |
| 單元 1 選做 `webapp-testing` | 另外安裝，用瀏覽器實際測試範例 1 的產品頁 |
| 單元 3 `remotion-best-practices` | 影片算圖較花時間 |
| 單元 4 `arxiv` | 查論文、寫論文前言，需要較多時間閱讀與核對 |
| 單元 5 `research-paper-writing` | 用開放資料分析、找文獻，寫出完整研究論文；延伸：輸出 APA 第 7 版格式 |
| 單元 6 第二段、選做 `grilling` | 依改進計畫修改論文；選做時另外安裝 grilling，逼問改進計畫，和 brainstorming 比較 |
| 單元 7-1 `find-skills` | 操作簡單，照範例做即可；範例 2 練習安裝前先檢查 skill，並看一個介紹和內容不符的真實案例 |
| 單元 7-2 `skill-creator` 範例 | 範例 1 做語音講稿 skill（課堂上已在單元 9 實作延伸 A 練過做 skill）；範例 2 把階段五的交叉審查流程做成 skill，上過階段五再做 |
| 單元 8 文件處理 | 課堂上已在單元 9 間接用過，這裡練習產出 Excel 與簡報；選做時另外安裝 `theme-factory` 幫簡報換主題 |
| 單元 9 實作延伸 A 選做、延伸 B、C、D | 用核對結果修改 skill、合併新資料、建立知識庫並驗證、產出交付成果 |

---

## 單元 0：先備知識

### 什麼是 Skill？

Skill 是寫給 agent 的工作說明書：告訴它某一類任務該怎麼做、要遵守哪些規範、可以用哪些工具或腳本。有了 skill，agent 就不必每次從頭摸索，而是照你（或別人）整理好的經驗做事。

Skill 是一個資料夾，內含 `SKILL.md`（以及可選的腳本、資料、參考文件）。Agent 會依據 `SKILL.md` 開頭的 `description` 判斷**什麼時候該自動載入**它；載入後就照裡面的流程與規範做事。

你通常**不需要點名 skill**，只要描述任務，符合條件的 skill 就會被觸發。若想強制使用，也可以直接寫 `/skill名稱` 或「請使用 xxx skill」。

Skill 可以裝在兩個地方：

| 位置 | 範圍 |
| --- | --- |
| 專案裡的 `.claude/skills/`、`.agents/skills/` | 只在這個專案生效，本課程的 skill 都裝在這裡 |
| 使用者目錄（例如 `~/.claude/skills/`） | 全域 skill，所有專案都會生效 |

如果你的電腦上另外裝了全域 skill，它們也會在本課程的專案裡出現，可能和課程的 skill 搶著被觸發。

### 安裝指令說明

> **本課程的 12 個 skill 已經裝好，課堂上不要執行本教材裡的安裝、更新、移除指令。** 重新安裝可能換成不同版本，讓你的結果和教材不同。這些指令是給你離開本課程、在自己的專案安裝 skill 時參考。唯一例外是標示「選做」、要另外安裝 skill 的段落：課後可以依該段的指示安裝，做完照指示移除。

```bash
npx skills add <GitHub擁有者>/<repo>[@skill名稱] -a antigravity -a claude-code --copy -y
```

| 參數 | 意義 |
| --- | --- |
| `owner/repo` | 安裝該 repo 內所有 skills |
| `owner/repo@name` | 只安裝 repo 中的某一個 skill |
| `-a antigravity -a claude-code` | 同時安裝給兩個 agent（寫入 `.agents/skills/` 與 `.claude/skills/`） |
| `--copy` | 複製檔案而非建立連結（Windows 上較穩定） |
| `-y` | 略過確認提示 |

常用管理指令：

```bash
npx skills find <關鍵字>   # 搜尋 skill
npx skills update          # 更新所有已安裝 skill
```

安裝完成後，專案根目錄會出現 `skills-lock.json` 記錄版本。**重新啟動 agent 工作階段**後 skill 才會生效。

---

## 單元 1：設計品質 — `frontend-design`

```bash
npx skills add anthropics/skills@frontend-design -a antigravity -a claude-code --copy -y
```

**用途**：Anthropic 官方 skill。讓 AI 做前端時像「設計工作室的設計總監」，從主題本身找出配色、字體與版面方向，避免千篇一律的「紫色漸層 + 大數字 + 卡片」AI 模板感。

**重點觀念**

- 先釐清主題、受眾、頁面的主要任務，再決定美學方向
- Hero 區要放「這個主題最有代表性的東西」
- 字體刻意挑選，建立明確的字級系統；字體本身就是設計的一部分

### 範例 1：從零做一個有個性的產品頁

```text
在目錄 example/case01/ 中，幫我做一個台灣手工茶葉品牌「山嵐茶研所」的單頁官網（HTML + CSS），主頁面存成 example/case01/index.html。
受眾是 30–50 歲重視產地與職人精神的消費者。
需要：品牌故事、三款茶品介紹、產地地圖區、訂購按鈕。
不要用常見的 SaaS 模板風格，請先提出 2 個美學方向讓我選。
```

**預期行為**：Agent 先提出例如「宣紙水墨 + 襯線字」與「高山晨霧 + 大留白」兩種方向，確認後再實作，配色與字體都會呼應茶與山的主題。

**驗證觸發**：完成後追問下面這句，確認 agent 確實載入了 skill。

```text
在這個 Case 你使用了哪些 Skills
```

### 範例 2：把「AI 模板感」頁面改造成有辨識度的設計

#### 步驟 A：先不用 skill 做一個版本（對照組）

```text
在 example/case01/before/ 做一個 AI 筆記新創「NoteMind」的 landing page（HTML + CSS）。
這次不要使用任何 skill，直接做。
```

#### 步驟 B：用 frontend-design 改造

```text
請用 frontend-design 檢視 example/case01/before/ 的頁面，指出設計上的問題後重新設計，
保留文案與功能，輸出到 example/case01/after/，
並用表格比較兩個版本的設計決策（配色、字體、版面）與修改原因。
```

**預期行為**：沒有 skill 時，agent 常會做出常見的模板風格，例如紫藍漸層、置中大標題、三欄卡片、預設字體。改版時 AI 會指出這些問題，換成有辨識度的字體配對和版面節奏。把兩個版本並排打開，就能看出 skill 帶來的差異。

> 「不要使用任何 skill」是寫在提示詞裡的要求，agent 大多會遵守，但不保證。做完可以問它「這次有沒有用到 skill」確認。

### 選做：用 webapp-testing 實際測試頁面

AI 說「頁面做好了」，不代表每個區塊都正常。[`webapp-testing`](https://github.com/anthropics/skills/tree/main/skills/webapp-testing)（Anthropic 官方）會用 Playwright 真的打開瀏覽器、點按鈕、截圖、讀取錯誤訊息。

這個 skill 不在課程預先安裝的 12 個裡面，要自己安裝，做完再移除。第一次使用時，Playwright 會下載瀏覽器核心（約 700 MB），需要幾分鐘與網路連線。安裝前先看過它的 `SKILL.md`：

```text
打開 https://github.com/anthropics/skills/tree/main/skills/webapp-testing 的 SKILL.md，告訴我它在什麼情況下會被觸發、會執行哪些指令、會不會連線到外部網站或修改檔案。先不要安裝。
```

確認沒問題後再安裝：

```text
請幫我安裝 skill：npx skills add anthropics/skills@webapp-testing -a antigravity -a claude-code --copy -y
```

**重新啟動工作階段**後：

```text
請用 webapp-testing 測試 example/case01/index.html（範例 1 做的產品頁），先不要修改任何檔案：
1. 用電腦（1280×800）與手機（375×812）兩種寬度打開頁面，各截一張整頁圖，存到 example/case01/test/
2. 確認品牌故事、三款茶品、產地地圖、訂購按鈕都有出現，手機寬度下沒有左右捲動
3. 點一下訂購按鈕，記錄發生了什麼
4. 列出瀏覽器主控台的錯誤訊息
Python 用 uv run --with playwright 執行；第一次先執行 uv run --with playwright python -m playwright install chromium。
結果整理成 example/case01/test/report.md。
```

**預期行為**：第一次會先下載瀏覽器，接著寫一支 Playwright 測試程式，存下兩張截圖與測試報告。打開截圖自己看一次，對照報告寫的是否屬實。Windows 上常見兩個狀況，可以直接告訴 agent：

- 出現 `UnicodeEncodeError`（cp950）：請它設定 `PYTHONIOENCODING=utf-8` 再執行
- 卡在等待網頁載入，最後 `Timeout`：請它改成等頁面的 `load` 事件，不要等網路完全閒置（`networkidle`）

**想一想**：測試程式也是 AI 寫的，它檢查的項目會不會剛好都是自己做對的地方？自己挑一項它沒測到的（例如點產地地圖、填寫訂購表單），請它加測。

做完後移除：

```text
請移除 skill：npx skills remove webapp-testing -y
```

移除 skill 不會刪掉 Playwright 下載的瀏覽器（Windows 在 `%LOCALAPPDATA%\ms-playwright`）。不再需要時，可以請 agent 執行 `uv run --with playwright python -m playwright uninstall --all` 釋出空間。

---

## 單元 2：視覺設計 — `canvas-design`

```bash
npx skills add anthropics/skills@canvas-design -a antigravity -a claude-code --copy -y
```

**用途**：Anthropic 官方 skill，用來設計海報、視覺作品，輸出成 PNG 或 PDF。它分兩步進行：先寫一份「設計理念」（.md），定下配色、構圖、字體的方向，再依這份理念做出作品。風格偏向藝術海報：以圖像與構圖為主，文字很少。

> skill 附的字型都是英文字型。海報上有中文時，在提示詞裡請它使用系統內建的中文字型（Windows：Microsoft JhengHei；macOS：PingFang TC），避免中文顯示成方框。

### 範例 1：幫品牌做一張宣傳海報

```text
用 canvas-design 幫台灣手工茶葉品牌「山嵐茶研所」做一張直式宣傳海報，存成 example/case02/poster.png，
並附上設計理念 example/case02/philosophy.md。
海報上要有品牌名稱與一句標語，中文使用系統內建的中文字型。
```

> 沿用單元 1 範例 1 的品牌設定；沒做過也可以直接執行。

**預期行為**：先產出設計理念，說明配色、構圖與想傳達的感覺，再依理念畫出海報。畫面以山、霧、茶這類意象構成，文字只有品牌名稱與標語，而且不會超出邊界或互相重疊。可以和單元 1 的官網並排比較，看看同一個品牌在網頁和海報上的設計是否一致。

### 範例 2：比較有沒有 skill 的差異

先開一個新的工作階段，**不使用 skill** 做一次：

```text
幫「春日花藝市集」做一張 A4 直式活動海報，存成 example/case02/market-noskill.pdf。
風格柔和（粉彩色、大量留白）。海報上要有活動名稱、日期「4 月 12 日」、地點「城南公園」。
中文使用系統內建的中文字型。這次不要使用任何 skill，直接做。
```

再用 canvas-design 做一次：

```text
用 canvas-design 幫「春日花藝市集」做一張 A4 直式活動海報，存成 example/case02/market.pdf，
並附上設計理念 example/case02/market-philosophy.md。
風格柔和（粉彩色、大量留白）。海報上要有活動名稱、日期「4 月 12 日」、地點「城南公園」。
中文使用系統內建的中文字型。
```

**預期行為**：沒有 skill 時，agent 可能做出標題加色塊的簡單排版，也可能改用 AI 生圖工具，畫面反而更華麗。用 canvas-design 時，會先定出設計理念，再用程式與字型畫出作品。兩張並排打開，除了比較好不好看，也檢查這幾點：

- 中文字是否正確：AI 生圖常把中文寫錯或變形，canvas-design 用字型排版，字一定正確
- 能不能修改：想改一個字或換顏色時，哪一種比較容易
- 適不適合印刷：放大檢查 PDF，文字邊緣是否清晰

漂亮與好用不一定是同一件事，選擇工具時要看用途。

**比較看看**：把風格改成「顏色鮮明（高彩度、強烈對比）」，用 canvas-design 再做一次，存成 `example/case02/market-vivid.pdf`，看設計理念與配色怎麼跟著改變。

> 主題要有具體的畫面，海報才容易做得好看。像「山嵐茶研所」有山、霧、茶葉，「花藝市集」有花、葉、攤位；太抽象的主題（例如「AI 課程」）容易做成充滿線條與術語的科技風。

---

## 單元 3：做影片 — `remotion-best-practices`

```bash
npx skills add remotion-dev/skills@remotion-best-practices -a antigravity -a claude-code --copy -y
```

**用途**：Remotion 官方 skill。Remotion 讓你**用 React 寫影片**，此 skill 是路由器，會依任務載入子指南：建立專案、字幕（captions）、地圖動畫、多媒體處理、算繪輸出、Studio 互動編輯等。

**兩種輸出方式**

| 方式 | 做法 | 適合 |
| --- | --- | --- |
| 直接輸出 | agent 執行 `npx remotion render`，直接產生 MP4 | 一句提示詞從頭做到成品，本節範例採用這種 |
| 先開 Studio | agent 啟動 `npx remotion studio`，在瀏覽器即時預覽，修改後馬上看到效果，再由你在網頁上按 Render 輸出 | 想邊看邊調整動畫時 |

這個 skill 預設會先開 Studio，所以提示詞要明確寫「直接輸出成 MP4」。第一次算繪時，Remotion 會自動下載算繪用的瀏覽器核心（約 100 MB 以上），需要幾分鐘與網路連線。

### 範例 1：做一支活動宣傳短片

```text
在 example/case03/ 用 Remotion 做一支 15 秒、1080x1920 直式的「春日花藝市集」宣傳短片：
開場花朵一朵朵綻放，接著活動名稱彈跳出現，再依序帶出三個亮點（手作花束、植栽交換、現場音樂），
最後顯示日期「4 月 12 日」與地點「城南公園」。配色明亮活潑，節奏輕快。
完成後直接輸出成 example/case03/out/promo.mp4。
```

**預期行為**：建立 Remotion 專案 → 以 `useCurrentFrame()` + `spring()` / `interpolate()` 做出花朵綻放與文字彈跳的動畫 → 執行 `npx remotion render` 輸出 MP4。想邊看邊調整時，可以請 agent「開 Studio 讓我預覽」。可以和單元 2 範例 2 的海報對照，看同一個活動在海報與影片上的視覺是否一致。

### 範例 2：幫影片加上旁白與字幕

```text
幫 example/case03/ 裡範例 1 做的「春日花藝市集」宣傳短片加上中文旁白與字幕：
旁白語氣要熱情活潑，用 edge-tts 產生約 15 秒的旁白 narration.mp3（語速與音高可以稍微調高），
並用 --write-subtitles 同時輸出 narration.srt，
再用 Remotion 把旁白放進影片、依 SRT 時間軸顯示字幕（目前這句要高亮），
最後直接輸出成 example/case03/out/promo-narrated.mp4。
```

**預期行為**：用 `edge-tts --voice zh-TW-HsiaoChenNeural --rate=+15% --pitch=+10Hz ... --write-media narration.mp3 --write-subtitles narration.srt` 產生語氣輕快的音檔與字幕，載入 captions 子指南的 SRT 匯入方式，以 `<Audio>` 放入旁白、依時間軸渲染字幕，再算繪輸出。修改的是範例 1 的 Remotion 專案，不是已輸出的 MP4；新影片另存成 `promo-narrated.mp4`，可以和加旁白前的 `promo.mp4` 比較。不需要另外準備影片或語音辨識模型。

> edge-tts 依賴微軟線上服務，若出現 403 錯誤，先執行 `uv tool upgrade edge-tts` 更新到最新版再試。可用的聲音與語氣參數見單元 7-2。

---

## 單元 4：論文研究 — `arxiv`

```bash
npx skills add NousResearch/hermes-agent@arxiv -a antigravity -a claude-code --copy -y
```

**用途**：讓 agent 透過 arXiv 與 Semantic Scholar 的免費 API（只用 `curl`，不需金鑰）**查詢論文**：依關鍵字、作者、分類或 arXiv ID 搜尋，取得正確的作者與日期、**引用數**、參考文獻，並產生 **BibTeX**。

AI 的訓練資料有截止日，也記不住精確的引用數；沒有這個 skill 時，agent 只能靠一般網頁搜尋，日期與引用數常常不準或查不到。

> 這個 skill 負責「查論文」，不負責寫作與排版。範例 2 的文章由 agent 撰寫，PDF 由 `pandoc` 與 LaTeX（安裝見 [01-install](../01-install/README.md) 模組三）產生。

### 範例 1：主題搜尋與引用數

```text
用 arxiv 找最近 6 個月關於「LLM agent 使用工具」的論文 5 篇，
另外找這個主題引用數最高的 3 篇經典論文，
整理成表格（標題、作者、日期、arXiv ID、引用數、一句話摘要），存成 example/case04/papers.md。
```

**預期行為**：用 arXiv API 依提交日期排序搜尋新論文，再用 Semantic Scholar 查引用數，表格中「新論文」與「經典論文」的引用數會有明顯差距，每篇都附 arXiv 連結可以自己點開核對。

**比較看看**：開一個新的工作階段，把提示詞的「用 arxiv」拿掉、並請 agent 不要使用 arxiv skill 再做一次，對照兩份表格的日期與引用數是否正確。

### 範例 2：寫論文前言，引用真實存在的論文

寫論文的前言（Introduction）要交代研究背景與前人的研究，一定會引用論文。AI 在這裡最常犯的錯，是編造看起來很像真的、實際上不存在的論文。

```text
我要寫一篇關於「大型語言模型如何學會使用工具」的研究論文，請幫我寫前言（Introduction），約 600 字，
說明研究背景、相關研究的發展，以及目前還沒解決的問題，引用 5～8 篇相關論文。
每篇引用都要用 arxiv 查出真實存在的論文並附上 arXiv 編號，查不到的不要引用。
前言存成 example/case04/introduction.md，參考文獻存成 example/case04/references.bib，
最後用 pandoc 轉成 example/case04/introduction.pdf。
```

**預期行為**：

1. **查論文**：先用 arxiv skill 搜尋相關研究，挑出要引用的論文，取得正確的標題、作者、年份與 arXiv 編號。
2. **寫前言**：依「研究背景 → 相關研究 → 尚未解決的問題」的順序撰寫，文中以作者與年份標註引用。
3. **產生參考文獻**：把引用的論文整理成 BibTeX（`references.bib`），每篇都有 arXiv 編號。
4. **轉成 PDF**：用 `pandoc --citeproc` 把前言與參考文獻合併輸出，文末自動附上參考文獻列表。

**比較看看**：開一個新的工作階段，把「用 arxiv 查出」改成「附上參考文獻」再寫一次。對照兩份參考文獻，把每篇論文的標題貼到 arXiv 或 Google Scholar 搜尋，看哪一份有查不到的論文。

查得到也不代表引用正確：AI 也常引用真實存在的論文，卻把內容寫錯。每份各挑兩篇，打開 arXiv 上的摘要，確認前言裡對這篇論文的描述和摘要相符。

---

## 單元 5：研究論文寫作 — `research-paper-writing`

延續單元 4 的 arxiv，用真實的開放資料，從分析、找文獻到寫出一篇完整的研究論文。這個實作結合兩個 skill 與一個工具：`research-paper-writing` 負責論文結構與寫作品質，`arxiv` 負責查證參考文獻，產出 PDF 時會用到 `pandoc`。

> **這是寫作練習，不是可以直接投稿或繳交的論文。** 正式用 AI 協助寫作時：
>
> - 依期刊或學校的規定，揭露使用了哪些 AI 工具、用在哪些地方
> - AI 不能列為作者，內容的正確性由作者負責
> - 數字、引用與結論都要自己核對過，才能放進正式文件

```bash
npx skills add master-cai/research-paper-writing-skills@research-paper-writing -a antigravity -a claude-code --copy -y
```

**`research-paper-writing` 的用途**：整理論文各章節的寫法（摘要、前言、方法、結果、討論、結論），要求每段只講一件事、每個主張都要有證據支持，寫完再用審稿人的角度自我檢查。範例偏向資訊領域的論文，但這些原則適用於各種研究。

**資料**：[臺灣高級中等學校校級面板資料](https://github.com/gemini960114/tw-highschool-panel)，整合教育部 103–114 學年度各高中的學生數、班級數、科別資料，附完整的欄位說明。

> 老師已事先下載資料並固定版本，放在 `example/case05/source/data/`：資料檔 `hs_school_year.csv`、欄位說明 `codebook.md`、資料授權 `LICENSE-DATA.md`。固定版本才能讓每位學生的分析結果一致，也不受上課時的網路狀況影響。

**研究題目**：〈少子化下的高中版圖：103–114 學年度公私立高中新生與技職比例的變化〉

- 研究問題 1：103 到 114 學年度，私立高中一年級學生數的下降幅度，是否大於公立高中？
- 研究問題 2：同一期間，專業群科學生占全體學生的比例是上升還是下降？公立和私立的變化是否不同？

### 步驟 1：分析資料

```text
example/case05/source/data/ 裡有臺灣高級中等學校的校級面板資料（hs_school_year.csv），
欄位說明在 codebook.md，資料授權與引用方式在 LICENSE-DATA.md。
先讀欄位說明，再用 Python 分析兩個研究問題：
1. 103 到 114 學年度，私立高中一年級學生數的下降幅度，是否大於公立高中？
2. 同一期間，專業群科學生占全體學生的比例是上升還是下降？公立和私立的變化是否不同？
要排除哪些學校、公私立怎麼分，都寫進 example/case05/analysis.md 並說明理由。
圖表存到 example/case05/figures/，數字結果存成 example/case05/results.md。
```

**預期行為**：先讀欄位說明，再決定分析方式。例如進修學校、特教學校、矯正學校的性質不同，可能要排除；國立與縣市立合併為公立。每個決定都寫進 `analysis.md`。結果的方向應該是：

- 私立一年級學生數減少約一半，公立約減少兩成，私立的下降幅度明顯較大
- 專業群科的比例整體下降，但主要來自私立；公立反而微幅上升（單元 6 會換一種算法再檢驗這個結論）

排除條件不同，數字會略有差異，但方向應該一致。這也是 `analysis.md` 要寫清楚理由的原因：別人才能重現你的結果。

**先確認再往下做**：排除哪些學校、公私立怎麼分，是整篇論文的基礎，後面每一步都建立在這些決定上。先自己讀過 `analysis.md`，有不同意的地方先和 agent 討論、修改，同意後再進行步驟 2。

### 步驟 2：整理參考文獻，再用 arxiv 補充國際研究

> 老師提供 `example/case05/source/references.bib`：從台灣學術資料庫（ERICDATA、月旦知識庫、臺師大博碩士論文系統）與教育部統計處整理的 6 筆文獻，每筆都已核對書目資料，並註明對應哪個研究問題。台灣的教育研究大多發表在國內期刊，arXiv 找不到，所以由人先找好；arxiv 用來補充國際研究。

```text
把 example/case05/source/references.bib 複製成 example/case05/references.bib，原有的文獻不要修改。
接著用 arxiv 搜尋其他國家的相關研究，例如因人口減少而整併學校、技職教育的選擇，
把真實存在且相關的論文加進 example/case05/references.bib。
最後寫一份文獻筆記 example/case05/literature.md，每篇用一句話說明它可以支持論文的哪個論點。
```

**預期行為**：老師提供的 6 筆維持原樣。用 arxiv 搜尋時，通常只能找到幾篇「相關但不直接」的國外研究，例如 Hannum 等人（2022）分析中國因人口減少而整併農村學校的研究；找不到就如實說明，不要硬湊。文獻筆記會把每篇對應到論文的論點，例如郭義汶、吳清山（2017）對應研究問題 1，周愚文（2024）對應研究問題 2。

> 用 arxiv 時也會用到 Semantic Scholar 的免費 API，沒有金鑰時流量很低，很多人同時使用容易出現 429（請求太多）的錯誤。遇到時等一兩分鐘再試，或改成只用 arXiv 搜尋。

**這樣分工的原因**：最重要的文獻由人在學術資料庫查證，AI 只能用給它的文獻寫作，最不容易編造。這也是用 AI 寫論文時最安全的做法。

### 寫論文的順序

接下來分三步寫論文。寫作順序和論文的閱讀順序不同：**先寫事實，再寫詮釋，最後寫總結**。

| 順序 | 章節 | 為什麼這時候寫 |
| --- | --- | --- |
| 1 | 資料與方法 | 你做了什麼，最確定、最好寫 |
| 2 | 結果 | 數據呈現了什麼，只描述事實，不解釋 |
| 3 | 前言 | 結果確定了，才知道要怎麼鋪陳背景、引用哪些前人研究 |
| 4 | 討論（含結論） | 對照前人研究解釋結果，並寫出研究限制 |
| 5 | 摘要 | 全文完成後才濃縮得出來 |
| 6 | 標題 | 最後依實際內容修正 |

一次寫完整篇論文時，agent 容易先寫出漂亮的前言，結果數字卻對不上；照這個順序寫，每一步都建立在前一步確定的內容上，也能每一節分開檢查。三個步驟都點名 `research-paper-writing`，它會依章節載入對應的寫作指南。

### 步驟 3：資料與方法、結果

```text
用 research-paper-writing 撰寫論文的「資料與方法」與「結果」兩節，
根據 example/case05/analysis.md、results.md 與 figures/，
分別存成 example/case05/paper/01-methods.md 與 02-results.md。
結果只描述數據呈現的現象，不解釋原因；文中數字都要和 results.md 一致，圖表要編號並在文中引用。
```

**預期行為**：方法一節說明資料來源、分析期間、排除哪些學校與理由、公私立的分類方式，內容來自 `analysis.md`；結果一節依兩個研究問題分段，引用圖表並列出關鍵數字，只說「私立一年級學生數減少約一半」這類事實，不說「因為少子化」。資料涵蓋教育部統計的全部學校，不是抽樣，所以只做描述統計、不需要顯著性檢定；方法一節應該寫明這一點，沒寫到就請 agent 補上。寫完先核對數字，再進行下一步。

### 步驟 4：前言與討論

```text
用 research-paper-writing 撰寫「前言」與「討論」兩節，
分別存成 example/case05/paper/03-introduction.md 與 04-discussion.md。
引用只能用 example/case05/references.bib 的文獻，沒有文獻支持的論點標記〔需引用〕。
前言說明研究背景、前人研究與兩個研究問題；討論要對照前人研究解釋結果，
並寫出研究限制與結論，例如這份資料只能看出變化、不能證明原因。
```

**預期行為**：前言從少子化的背景談起，引用郭義汶、吳清山（2017）、周愚文（2024）等文獻，最後帶出兩個研究問題。討論把結果與前人研究對照，例如私立學校招生下降的幅度，是否符合郭義汶、吳清山（2017）的預測；並寫出研究限制：

- 這份資料只能看出變化，不能證明原因。「少子化造成私立學校招生下降」是推論，要寫成「可能與少子化有關」
- 一年級學生數也受學校停招、整併影響，學校數的變化要一併說明

### 步驟 5：摘要、標題與全文

```text
用 research-paper-writing 根據已完成的各節，撰寫約 250 字的摘要（example/case05/paper/05-abstract.md），
再提出 3 個標題候選並說明取捨，選出最合適的一個（example/case05/paper/06-title.md）；
暫定標題是〈少子化下的高中版圖：103–114 學年度公私立高中新生與技職比例的變化〉。
接著依「標題、摘要、前言、資料與方法、結果、討論、參考文獻」的順序合併成 example/case05/paper.md，
以審稿人的角度自我檢查，把發現的問題與修改紀錄在 example/case05/review.md，
最後用 pandoc 轉成 example/case05/paper.pdf，包含圖表與參考文獻。
```

**預期行為**：摘要依「背景、目的、方法、主要結果、結論」濃縮全文，數字與結果一節相同。標題候選會比較不同寫法的優缺點，例如是否點出「公私立差距」這個主要發現。合併時章節順序改回一般論文的閱讀順序。`review.md` 列出審稿人可能質疑的地方與修改方式，例如結論是否寫得比證據更肯定、〔需引用〕的地方是否還能補上文獻。

**核對**：

- 挑三個論文裡的數字，回頭對照 `results.md`
- 挑一篇 arxiv 找到的參考文獻，到 arXiv 打開，確認它真的存在、內容和論文裡的描述相符
- 讀 `review.md`，看看審稿人的意見是否都已處理
- 找出論文中**沒有附數字、也沒有引用文獻**的事實描述，例如沒有附來源的原因解釋，確認是否有根據。AI 的自我審稿通常只檢查「有沒有引用」，不會檢查「事實本身對不對」，這一項要靠人核對
- `review.md` 是同一個 AI 檢查自己寫的論文，容易漏掉自己的盲點。上過階段五的話，依 [REVIEW-LOOP.md](../05-review-loop/REVIEW-LOOP.md) 把論文交給**不同 AI 工具、且使用不同模型**的 AI 審查

### 延伸：輸出 APA 第 7 版格式

> 老師已提供 APA 第 7 版的官方引用格式檔 `example/case05/source/apa.csl`，來自 [Citation Style Language 官方樣式庫](https://github.com/citation-style-language/styles/blob/master/apa.csl)（CC BY-SA 3.0 授權）。pandoc 加上 `--csl apa.csl`，就會依 APA 格式排列引用與參考文獻。其他引用格式（例如 IEEE、Chicago）也可以在這個樣式庫找到。

```text
用 example/case05/source/apa.csl（APA 第 7 版官方引用格式檔），
把 example/case05/paper.md 重新轉成 example/case05/paper-apa.pdf。
```

**預期行為**：執行 `pandoc --citeproc --csl example/case05/source/apa.csl ...` 重新輸出。英文文獻大致符合 APA 格式，例如「Hannum, E., Liu, X., & Wang, F. (2022).」，但標題的專有名詞可能被改成小寫（例如 China's 變成 china's），要在 `references.bib` 把專有名詞寫成 `{China}` 才能保留大寫。中文文獻的結構正確（年份、刊名、卷期、頁碼、DOI），但標點與連接詞仍是英文寫法：

| 項目 | apa.csl 的輸出 | 中文 APA 的寫法 |
| --- | --- | --- |
| 作者之間 | 郭義汶, & 吳清山. (2017). | 郭義汶、吳清山（2017）。 |
| 學位論文 | [Master’s thesis, 國立臺灣師範大學工業教育學系] | 〔碩士論文，國立臺灣師範大學工業教育學系〕 |
| 標點 | 半形句點與逗號 | 全形句號與逗號 |

工具能處理大部分格式，但英文的專有名詞、中文的寫法慣例都需要人工確認，交稿前仍要逐筆檢查。

---

## 單元 6：多輪討論 — `brainstorming`

```bash
npx skills add obra/superpowers@brainstorming -a antigravity -a claude-code --copy -y
```

**用途**：出自 `obra/superpowers`。讓 agent 在動手前**先跟你把事情談清楚**：一次只問一個問題，先請你用自己的話描述，你卡住時才提供選項，談完寫成文件。範例的提示詞會另外要求它提出 2～3 種改法並說明取捨。適用於任何需要先想清楚的情境，例如規劃新功能、設計報告，或像本章這樣改進一篇已經寫好的論文。

> 這個 skill 預設會把討論結果存到 `docs/superpowers/specs/`，並在最後建議接著寫實作計畫（需要另一個本課程沒裝的 skill）。範例的提示詞會指定存檔位置，並說明「先不要修改」。

### 範例：多輪討論，改進單元 5 的論文

單元 5 的論文已經寫好，也做過自我審稿，但 AI 一次寫完的論文，常有單次檢查看不出的問題。這個範例用 brainstorming 和 agent 一輪一輪討論：每次只談一個問題、用資料驗證、由你決定怎麼改，最後產出修正版。原本的論文保留在 `example/case05/`，修正版放在 `example/case06/`，方便前後比較。

### 第一段：討論改進方向

建議**開一個新的對話視窗**做討論：新的工作階段不記得論文當初怎麼寫，比較能客觀挑出問題。第二段修改沿用同一個視窗即可。

> **課堂版（還沒做單元 5 時）**：老師在 `example/case06/source/` 準備了一份用單元 5 提示詞跑出來的論文與自我審稿紀錄。第一段討論改用下面的提示詞：
>
> ```text
> 請用 brainstorming 跟我討論如何改進 example/case06/source/paper.md，審稿意見在 example/case06/source/review.md，
> 資料在 example/case05/source/data/。
> 先讀完論文，找出最值得改進的 3～5 個問題，一次只討論一個：說明問題在哪、提出 2～3 種改法與取捨，
> 等我選定再討論下一個。需要驗證的地方，先用資料計算給我看。
> 討論完把決定整理成 example/case06/improvement-plan.md，先不要修改論文。
> ```
>
> **課堂上只做第一段**：討論 2～3 個問題、產出 `improvement-plan.md` 即可。第二段修稿留到課後，課後改用下面的提示詞：
>
> ```text
> 依 example/case06/improvement-plan.md 修改 example/case06/source/paper.md，
> 修正版存成 example/case06/paper-v2.md，需要的圖表從 example/case06/source/figures/ 複製到 example/case06/figures/，
> 參考文獻從 example/case06/source/references.bib 複製到 example/case06/references.bib，
> 新增的分析圖表存到 example/case06/figures/，最後用 pandoc 轉成 example/case06/paper-v2.pdf。
> example/case06/source/ 裡的檔案都不要修改。
> ```

```text
請用 brainstorming 跟我討論如何改進 example/case05/paper.md，審稿意見在 example/case05/review.md，
資料在 example/case05/source/data/。
先讀完論文，找出最值得改進的 3～5 個問題，一次只討論一個：說明問題在哪、提出 2～3 種改法與取捨，
等我選定再討論下一個。需要驗證的地方，先用資料計算給我看。
討論完把決定整理成 example/case06/improvement-plan.md，先不要修改論文。
```

**預期行為**：agent 讀完論文後，每次只提出一個問題，附上計算結果與 2～3 種改法，等你選定才進入下一題。不同的 agent 顯示方式不同：Claude Code 可能顯示可點選的選項，其他 agent 會用文字列出選項，直接打字回答即可，例如「採用方案 A」。實際的問題與順序會因 agent 而不同，下表是可能遇到的問題與參考回答，讓你知道討論的方向：

| 輪次 | agent 可能提出的問題 | 參考回答 |
| --- | --- | --- |
| 1 | 私立學校一年級人數減少約一半，是因為學校關閉，還是每校招生變少？ | 「請用資料拆解看看」 |
| 2 | 論文中有些說法沒有數據或文獻支持，怎麼處理？ | 「刪除，或改用資料驗證過的結果」 |
| 3 | 換一種排除條件，例如保留進修學校，結論還成立嗎？ | 「做敏感度分析，寫進論文」 |
| 4 | 專業群科比例的分母，該用全體學生，還是只算主要學制？ | 「兩種都算給我看」 |
| 5 | 論文裡的〔需引用〕要怎麼處理？ | 依自己的判斷：補文獻、改寫或保留 |
| 6 | 結論修正後，標題要不要調整？ | 依修改後的結論決定 |

討論時不用只等 agent 出題。你對論文有任何疑問，例如「換一種算法，結論還成立嗎？」，都可以直接提出來，請它用資料驗證。

討論中，agent 用資料驗證時，應該會得到類似的結果：

- **第 1 輪**：私立學校數 207 → 187（−9.7%），平均每校一年級人數 589 → 306（−48.0%）。私立減少的主因是每間學校招到的人變少，學校關閉只占一小部分。排除條件不同，數字會跟著變，例如課堂版論文算出 208 → 199 所、平均 586 → 288 人；只要方向相同（學校數小幅減少、平均每校人數約減半），結論就一致
- **第 3 輪**：保留進修學校重算，一年級變化為公立 −20.0%、私立 −52.9%，和原本的 −19.7%、−53.0% 幾乎相同，研究問題 1 的結論很穩定
- **第 4 輪**：分母用全體學生時，公立專業群科比例 30.5% → 31.3%（上升）；只算普通科、專業群科、綜合高中時，變成 33.0% → 32.4%（下降）。**換一種合理的算法，公立的方向就反過來了**，論文中「公立微升」的結論需要改寫；私立在兩種算法下都明顯下降，這部分結論穩定

**算過的版本都要寫進論文。** 敏感度分析試了幾種算法，就要把每一種的結果都報告出來，不能只留下支持結論的那一種，否則就是選擇性報告。比較好的做法是在看到結果之前，先決定要試哪幾種算法，這就是[階段七](../07-hpc-demo/README.md#討論問題)討論問題 3 提到的「先凍結方法」。

### 選做：用 grilling 逼問改進計畫

`improvement-plan.md` 寫好後、動手修改前，可以換一個風格不同的 skill 再檢查一次。[`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)（出自 `mattpocock/skills`）專門對已經寫好的計畫做壓力測試：把決定整理成一棵「決策樹」，一輪列出所有現在就能回答的問題，每題附上它的**推薦答案**；回答「yes」就是接受推薦。

這個 skill 不在課程預先安裝的 12 個裡面，要自己安裝，做完再移除，避免和 `brainstorming` 搶著被觸發。安裝前先看過它的 `SKILL.md`：

```text
打開 https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md 的 SKILL.md，告訴我它在什麼情況下會被觸發、會執行哪些指令、會不會連線到外部網站或修改檔案。先不要安裝。
```

確認沒問題後再安裝：

```text
請幫我安裝 skill：npx skills add mattpocock/skills@grilling -a antigravity -a claude-code --copy -y
```

**重新啟動工作階段**後：

```text
請用 grilling 逼問 example/case06/improvement-plan.md 這份改進計畫，找出還沒想清楚、或只是假設的地方。
資料在 example/case05/source/data/，需要事實的地方先自己用資料查證，需要決定的地方再問我。
先不要修改任何檔案；逼問結束、我確認後，再把調整寫回 improvement-plan.md。
```

**預期行為**：agent 一輪列出好幾個問題（❓ Q1、Q2……），每題下面附上推薦答案（➡️），等你回答完才進入下一輪；全部問完、你確認雙方理解一致後才動手。這個 skill 會派子代理（sub-agent）查資料，不支援的 agent 會改成自己查。

**注意**：推薦答案是 AI 的意見，不是事實。**不要一路回答 yes**，每一題都先想想推薦答案的理由站不站得住，需要時請它用資料算給你看。

**比較看看**：

| | `brainstorming` | `grilling` |
| --- | --- | --- |
| 一次問幾題 | 一題 | 一整輪 |
| 有沒有推薦答案 | 先請你自己描述 | 每題都有 |
| 適合 | 還沒想清楚要做什麼 | 檢查已經寫好的計畫 |

做完後移除：

```text
請移除 skill：npx skills remove grilling -y
```

### 第二段：依討論結果修改

```text
依 example/case06/improvement-plan.md 修改 example/case05/paper.md，
修正版存成 example/case06/paper-v2.md，需要的圖表與參考文獻從 example/case05/ 複製到 example/case06/，
新增的分析圖表存到 example/case06/figures/，最後用 pandoc 轉成 example/case06/paper-v2.pdf。
example/case05/ 裡的檔案都不要修改。
```

**預期行為**：依改進計畫逐項修改，例如結果一節加入學校數與平均每校人數的拆解、新增敏感度分析，討論一節把「公立微升」改成「依計算方式不同，公立大致持平」並說明原因，刪除沒有根據的敘述。`example/case05/` 的原版維持不變。

**比較看看**：把 `example/case05/paper.md` 和 `example/case06/paper-v2.md` 並排比較，找出哪些結論被修正、哪些分析是新增的，以及有哪些問題是單元 5 的自我審稿沒有發現的。討論時最值得問的一題，也是審稿人最常問的一題：**換一種合理的做法，結論還成立嗎？**

修正版也要核對：修改時新增的事實描述（例如資料集以外的統計數字）有沒有附上來源，「結果」一節是否仍只描述數據。agent 在修正問題的同時，也可能加入新的、沒有根據的說法。

---

## 單元 7：找 Skills 與自己做 Skill — `find-skills`、`skill-creator`

### 7-1. `find-skills` — 找現成的 skill

```bash
npx skills add vercel-labs/skills@find-skills -a antigravity -a claude-code --copy -y
```

**用途**：Vercel 官方的「找 skill 的 skill」。當你問「有沒有工具可以做 X？」時，agent 會先查 [skills.sh](https://skills.sh/) 排行榜，再用 `npx skills find` 搜尋，推薦合適的 skill 並協助安裝。

#### 範例 1：需要新能力時

```text
我想讓 AI 幫我搜尋與閱讀 arXiv 上的學術論文，有沒有推薦的 skill？
```

**預期行為**：搜尋 `arxiv` 或 `academic`，列出候選並說明安裝數與功能。agent 應該會發現本專案已經裝了 `NousResearch/hermes-agent@arxiv`（單元 4 使用），不需要再裝；可以請它比較其他候選和已安裝的有什麼不同。

**練習版本**

```text
我想讓 AI 幫我搜尋與閱讀 PubMed 上的學術論文，有沒有推薦的 skill？
```

#### 範例 2：限定來源搜尋

```text
幫我找 Vercel 官方出的 React / Next.js 效能最佳化 skill，列出候選並說明差異，先不要安裝。
```

**預期行為**：執行 `npx skills find react --owner vercel-labs`，列出 Vercel 官方的最佳實踐 skill 與安裝數，說明各自的用途，並附上安裝指令，但不實際安裝。課程預先安裝 12 個 skill，額外安裝會讓觸發變得不精準（見常見問題 Q3）。

**安裝前先檢查**：從候選中挑一個，看看它會做什麼，仍然不要安裝。

```text
打開剛才第一個候選 skill 在 GitHub 上的 SKILL.md 與附帶的腳本，告訴我：
它在什麼情況下會被觸發、會執行哪些指令、會不會連線到外部網站或修改檔案。先不要安裝。
```

**預期行為**：agent 讀取 GitHub 上的檔案，整理出觸發條件、會執行的指令與外部連線，並附上檔案連結。自己也點開連結看一次，再對照常見問題 Q5，判斷它的行為是否符合用途。

**真實案例：介紹和內容不一樣。** 網路文章常把 Anthropic 官方的 `brand-guidelines` 介紹成「把你的品牌色彩、字型套用到所有輸出」。實際打開來看：

```text
打開 anthropics/skills 裡 brand-guidelines 的 SKILL.md，告訴我：
它會套用「誰」的品牌顏色和字型？我能不能用它套用自己學校或公司的品牌？先不要安裝。
```

**預期行為**：agent 會發現它套用的是 **Anthropic 自己的**品牌（例如深色 `#141413`、橘色 `#d97757`），不是你的品牌。要套用自己的品牌，得改寫這個 skill 或用 skill-creator 做一個新的。介紹文字只能參考，裝之前一定要看 `SKILL.md`。

---

### 7-2. `skill-creator` — 把自己的工作流程做成 skill

```bash
npx skills add anthropics/skills@skill-creator -a antigravity -a claude-code --copy -y
```

**用途**：Anthropic 官方 skill。找不到現成的 skill 時，可以把手動摸索出來的流程、指令與參數對照表寫成 `SKILL.md`（含讓 agent 判斷何時載入的 `description`），讓 agent 具備固定的專業工作流程。

> **做 skill 的三個步驟**：**先手動做一次**（摸清流程與參數）→ **做成 skill**（寫入經驗與對照表）→ **換個題目測試**（確認會自動觸發）

#### 範例 1：做一個「語音講稿」skill

這個範例使用免費的 `edge-tts`（微軟語音合成）與 `ffmpeg`，Windows 與 macOS 都能使用。因為語音合成無法直接指定「喜怒哀樂」，必須組合聲音、語速與音高來呈現情緒。我們要把這個「調音經驗」固定成 skill。

**精選聲音與語氣推薦表**：

| 語氣 | 推薦聲音 | 語速 | 音高 | 適用場合 |
| :--- | :--- | :---: | :---: | :--- |
| **熱情活力** | `zh-TW-HsiaoChenNeural`（女） | `+15%` | `+10Hz` | 活動開場、重大宣佈 |
| **平穩專業** | `zh-TW-HsiaoChenNeural`（女） | `+0%` | `+0Hz` | 一般旁白、內容解說 |
| **溫柔感性** | `zh-TW-HsiaoYuNeural`（女） | `-15%` | `-5Hz` | 激勵、抒情收尾 |
| **新聞播報** | `zh-CN-YunyangNeural`（男） | `-5%` | `+0Hz` | 正式發表、權威分析 |

> 註：臺灣男聲（`zh-TW-YunJheNeural`）曾經暫時無法產生語音，課前請實際產生一次確認；無法使用時，需要男聲可改用專業感強的 Yunyang。可用的完整聲音清單執行 `edge-tts --list-voices` 查詢。講稿的標點也會影響語氣：「！」較有力，「……」會停頓，短句更有節奏感。

**步驟 1：手動做一次（摸索流程）**

```text
幫我寫一段約 100 字的「Agent Skills」課程開場白，分成 3 段，每段標出語氣（熱情、平穩、溫柔）。
用 edge-tts 依每段的語氣調整聲音、語速與音高產生語音，合併成 example/case07/intro.mp3，
並附上講稿 example/case07/script.md 與字幕 example/case07/intro.srt。
```

**預期行為**：講稿每段標出語氣與使用的參數；每段分別產生語音後用 `ffmpeg` 合併；字幕的時間會依前面段落的長度往後調整，與語音對得上。聽聽看三段的語氣是否層次分明。

**步驟 2：做成 skill**

```text
用 skill-creator 把剛才的流程做成一個 skill「voice-script」：
依主題與長度寫講稿並標出每段語氣 → 依語氣對照表設定聲音、語速、音高 → 分段產生語音 →
用 ffmpeg 合併 → 產生字幕。把語氣對照表寫進 skill 裡。
建立在 .claude/skills/voice-script/，並複製一份到 .agents/skills/voice-script/。
做好後先不要測試，也不用跑評估。
```

**步驟 3：重新啟動工作階段，換個題目測試（驗證效果）**

```text
幫我做一段 30 秒的期末成果發表開場語音，語氣先熱情再感性，存到 example/case07/final/。
```

**預期行為**：沒有點名 skill，也會自動用到 `voice-script`，依對照表選擇聲音與參數。skill 把「哪種語氣該用什麼參數」這類經驗固定下來，之後每次做語音都能沿用，不用重新摸索。

> edge-tts 依賴微軟的線上服務，偶爾會出現 403 錯誤。遇到時先執行 `uv tool upgrade edge-tts` 更新到最新版。

#### 範例 2：把交叉審查流程做成 skill（上過階段五再做）

階段五的 `REVIEW-LOOP.md` 是寫給人看的流程說明。把它做成 skill 之後，在任何專案說「幫我準備審查」，AI 就會照同一套流程產生審查 prompt、留下紀錄。

**步驟 1：準備流程文件**

先確認 `06-agent-skills/example/` 裡有 `case07` 資料夾，沒有就建立一個（Windows：在檔案總管的 `example` 資料夾裡按右鍵 →「新增 → 資料夾」；macOS：在 Finder 的 `example` 資料夾裡按右鍵 →「新增檔案夾」）。再把教材的 `05-review-loop/REVIEW-LOOP.md` 複製到 `example/case07/`。目前開啟的資料夾以外的檔案，AI 不一定讀得到。

**步驟 2：做成 skill**

```text
用 skill-creator 依照 example/case07/REVIEW-LOOP.md 做一個 skill「review-loop」，
用在「請另一個 AI 審查我的程式或文件」的情境：
產生審查 prompt → 存到 review-log/round-N-prompt.md：
  AI 只填寫專案用途、已決定的事、前幾輪已修正與已否決的項目；REVIEW-LOOP.md 步驟 ② 的四條規則逐字放入；
  開頭寫上第幾輪與版本：在 git repo 裡，先用 git status -- <待審檔案> 確認待審檔案沒有未 commit 的修改，
  再寫上 git rev-parse --short HEAD 的結果；其他檔案的修改不用管；
  不在 git repo 裡，或待審檔案沒有被 git 追蹤（git status 顯示 ??）時，改寫待審檔案的修改時間，並提醒我這次沒有版本紀錄；
  審查者讀不到檔案時（例如網頁版），提醒我把待審內容附在 prompt 後面，並附上檔案清單 →
我把審查回覆原文存成 review-log/round-N-review.md →
逐項判斷（接受／部分接受／否決），先不要修改 → 我確認後才套用，並存成 round-N-decision.md →
在 git repo 裡時，提醒我依 REVIEW-LOOP.md 的格式 commit 這一輪，不要自己 commit →
依停止條件判斷能不能結束。
建立在 .claude/skills/review-loop/，並複製一份到 .agents/skills/review-loop/。
做好後先不要測試，也不用跑評估。
```

**步驟 3：重新啟動工作階段，換個題目測試**

```text
我想請另一個 AI 審查 .claude/skills/voice-script/SKILL.md，幫我準備第 1 輪的審查，紀錄放在 example/case07/review-log/。
```

沒有做範例 1 時，改成審查老師提供的 `example/case06/source/paper.md`（只讀取，不要修改）；做完單元 5 的人，也可以審查自己的 `example/case05/paper.md`。

**預期行為**：沒有點名 skill，也會用到 `review-loop`，產生 `example/case07/review-log/round-1-prompt.md`，內容有背景、已決定的事、「只讀不執行」與回報格式，開頭標明第幾輪與版本。`voice-script/SKILL.md` 是你自己做的，沒有被 git 追蹤；用 ZIP 下載的教材則不是 git repo，這兩種情況都會改寫檔案的修改時間。提示語裡的 `<待審檔案>` 照抄即可，skill 執行時會換成實際的檔名。這裡只檢查待審檔案，和階段五檢查整個專案不同，因為教材資料夾裡本來就有其他練習的產出。和階段五一樣，**先檢查「已決定的事」**：AI 常把自己的設計選擇也列進去，不是你決定過的就刪掉。skill 只負責產出者這一側，審查仍要交給另一個 AI 工具，且使用不同模型。

**有時間再做（選做）：完整跑一輪。** 把 prompt 和 `SKILL.md` 的內容貼給另一個 AI 工具（且使用不同模型），回覆原文存成 `round-1-review.md`，再貼回來請它逐項判斷。確認 skill 會先停下來等你決定、存好 `round-1-decision.md`，才算驗證了整個流程，不只是產生 prompt。

---

## 單元 8：文件處理 — `docx`、`pdf`、`pptx`、`xlsx`

```bash
npx skills add anthropics/skills@docx -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@pdf -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@pptx -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@xlsx -a antigravity -a claude-code --copy -y
```

**用途**：Anthropic 官方 skill，讓 agent 能可靠地讀取與產生 Office 文件和 PDF。沒有這些 skill 時，agent 常要臨時自己寫程式讀檔，格式複雜一點就容易出錯；產出的 Excel、簡報也常只有內容、沒有版面。

| Skill | 作用 |
| --- | --- |
| `docx` | 讀取、建立、修改 Word 文件（標題層級、表格、目錄、追蹤修訂） |
| `pdf` | 擷取文字與表格、合併分割、填表單，掃描檔可做 OCR |
| `pptx` | 讀取、建立、修改簡報（版面、圖表、講者備註） |
| `xlsx` | 讀取、建立、修改試算表（公式、格式、圖表） |

> 這幾個 skill 不用特別點名，只要任務牽涉到這些檔案就會觸發。單元 9 實作讀取各種會議文件、延伸 D 產出交付成果時，也都會用到。

### 範例 1：把 CSV 做成有圖表的 Excel

```text
把 example/case08/source/臺灣採購經理人指數(pmi及nmi).csv 做成 Excel，存成 example/case08/pmi.xlsx：
第一個工作表放原始資料，第二個工作表算出每年的 PMI、NMI 平均，並加上歷年走勢的折線圖。
```

**預期行為**：產出有兩個工作表的 Excel，年度平均用公式計算（點開儲存格看得到公式，不是寫死的數字），折線圖的座標軸與圖例都有中文標示。CSV 裡 NMI 早期是「-」，agent 應該當成沒有資料處理，而不是當成 0。

### 範例 2：根據 Excel 做簡報

```text
根據 example/case08/pmi.xlsx 做一份 5 頁的簡報，存成 example/case08/pmi.pptx，
說明臺灣採購經理人指數的意義、近年走勢與重點觀察，要有圖表。
```

**預期行為**：產出 5 頁簡報，包含標題頁、指標說明、走勢圖表與重點觀察；圖表數字與 Excel 一致，文字不超出版面。用 PowerPoint 打開，檢查版面是否整齊、圖表能不能正常顯示。

### 選做：用 theme-factory 幫簡報換主題

[`theme-factory`](https://github.com/anthropics/skills/tree/main/skills/theme-factory)（Anthropic 官方）提供 10 組配色與字型組合，例如 Ocean Depths、Forest Canopy、Tech Innovation。它會先把主題展示給你看，等你選定才套用。

這個 skill 不在課程預先安裝的 12 個裡面，要自己安裝，做完再移除。安裝前先看過它的 `SKILL.md`：

```text
打開 https://github.com/anthropics/skills/tree/main/skills/theme-factory 的 SKILL.md，告訴我它在什麼情況下會被觸發、會執行哪些指令、會不會連線到外部網站或修改檔案。先不要安裝。
```

確認沒問題後再安裝：

```text
請幫我安裝 skill：npx skills add anthropics/skills@theme-factory -a antigravity -a claude-code --copy -y
```

**重新啟動工作階段**後：

```text
請用 theme-factory 幫 example/case08/pmi.pptx 換一套主題：
先把可選的主題給我看，等我選定後再套用，另存成 example/case08/pmi-themed.pptx，原本的 pmi.pptx 不要修改。
只套用主題的配色；字型一律使用系統內建的中文字型。
```

**預期行為**：先打開 `theme-showcase.pdf` 讓你看 10 個主題，等你回答要哪一個，才把配色套用到簡報。主題指定的字型（例如 FreeSerif、FreeSans）是英文字型，Windows 通常沒有，也不含中文，所以提示詞要求改用系統中文字型。把兩份簡報並排打開，檢查換色後文字和背景的對比是否足夠、圖表顏色有沒有跟著換。

**比較看看**：請它依「臺灣採購經理人指數、給主管看」自己產生一個新主題（skill 支援自訂主題），和預設主題比較。

做完後移除：

```text
請移除 skill：npx skills remove theme-factory -y
```

---

## 單元 9：組合技 — 一個完整專案怎麼串起來

以「做一個課程報名網站 + 宣傳影片」為例：

| 階段 | 你說的話 | 觸發的 Skill |
| --- | --- | --- |
| 找工具 | 「有沒有做表單驗證的 skill？」 | `find-skills` |
| 規劃 | 「我要做課程報名網站，先跟我討論需求」 | `brainstorming` |
| 設計方向 | 「給我有辨識度的視覺方向」 | `frontend-design` |
| 海報 | 「幫課程做一張宣傳海報」 | `canvas-design` |
| 宣傳 | 「做一支 15 秒宣傳影片」 | `remotion-best-practices` |
| 報表 | 「把報名名單整理成 Excel，再做成簡報」 | `xlsx`、`pptx` |
| 研究 | 「用報名資料分析學員背景，寫成一份研究報告」 | `research-paper-writing`、`arxiv` |
| 固定流程 | 「把每週的報名統計做成固定格式的報告」 | `skill-creator`（做成自己的 skill） |

### 實作：從混亂文件到會議知識庫

這個練習不是叫 AI 把檔案依年份丟進資料夾（那用一般程式就做得到），而是讓 agent **讀懂文件內容**，自己判斷哪些檔案屬於同一場會議、檢查缺漏與錯誤，最後把整套流程做成 skill。素材保留官方原始檔名，和真實工作一樣：有的檔名寫得很清楚，有的只有日期，有的完全看不出屬於哪場會議。

> 老師會提供國家發展委員會「資料開放諮詢小組」的公開會議資料（[政府資料開放平臺 18296](https://data.gov.tw/dataset/18296)），放在 `example/case09/`，請只讀取、不要修改：
>
> | 資料夾 | 內容 |
> | --- | --- |
> | `messy_files/` | 5 場會議（106 年第 3 次～108 年第 2 次）的議程、簡報、紀錄、逐字稿、附件，混雜一份不相關的統計資料，共 24 個檔，格式有 PDF、DOCX、PPTX、XLSX、ODT、CSV |
> | `extra_files/` | 另外 5 場會議（104～105 年），共 21 個檔（延伸 A 使用） |
> | `new_files/` | 事後才找到的 7 個檔（延伸 B 使用） |
> | `reference/` | 官方的「歷次會議紀錄暨資料清冊.csv」，列出每場會議的日期、出席者與文件 |
> | `teacher/` | 老師用的答案表，只在核對步驟使用 |

#### 步驟 1：盤點與提案，先不要動檔案

```text
example/case09/messy_files/ 裡有一批混在一起的政府會議文件。
請讀取每個檔案的內容（不要只看檔名），判斷它屬於哪一場會議、是哪一類文件，
整理成盤點表，並提出你建議的分類架構。
每個檔案先讀前 2000 字判斷就好，看不出來再往後讀，不要一次讀完整份檔案。
檔名和內容不一致、缺少文件、或無法判斷歸屬的，列入待確認清單，不要猜測。
先不要移動或複製任何檔案，把盤點結果存成 example/case09/plan.md。
```

**預期行為**：依檔案格式自動使用 `docx`、`pdf`、`pptx`、`xlsx` skill 讀取內容（ODT 用 `pandoc` 轉換），產出盤點表與分類架構。每個檔讀開頭約 2,000 字，總共約 5 萬字；有幾份議程把附件全文收在裡面，整份讀完會多花很多時間。注意觀察 agent 有沒有處理好這幾件事：

- `議程_核定版.docx` 檔名沒有年份與場次，必須打開才知道屬於 107 年第 1 次會議
- `1060928簡報.pptx`、`1070507議程附件1~4.pdf` 這類檔名只有日期，要讀內容才知道是第幾次會議
- 同一場會議的命名不一致（`108年度第2次會議_議程.pdf` 與 `108年第2次會議_紀錄.pdf`），不能當成兩場會議
- 108 年第 1 次與第 2 次會議都沒有逐字紀錄，應列為缺漏，而不是自己補一份
- 一份 CSV 是採購經理人指數，不屬於任何一場會議

#### 步驟 2：確認後才執行

```text
plan.md 的分類架構我同意（若有要調整的地方寫在這裡）。
請依 plan.md 把檔案「複製」到 example/case09/organized_files/，不要修改原始檔案；
plan.md 和這段指示不同的地方，以這段指示為準。
複製時改成看得懂的檔名（例如「107年第1次會議_議程.docx」），
無法判斷屬於哪場會議的檔案放在 organized_files/_待確認/，不要硬分到某場會議。
在 organized_files/ 裡產生 README.md（分類邏輯、檔案統計、異常紀錄）
與 INDEX.md（依年度、場次、文件類型建立的索引，附檔案連結，並註明原始檔名）。
完成後確認複製後的檔案數和原始檔案數一致。
```

**預期行為**：依確認過的架構建立資料夾，複製並重新命名檔案，`messy_files/` 保持原狀；最後回報檔案數核對結果。重點是「先提方案、人確認、再動手」：處理真實資料時，不可逆的動作要先讓人看過。

#### 步驟 3：用答案表核對

```text
請用 example/case09/teacher/messy_files_答案.csv 核對 example/case09/organized_files/，
以 organized_files/INDEX.md 記錄的原始檔名對照答案表，
列出分類正確、分錯與遺漏的檔案並計算正確率，結果存成 example/case09/check.md。
會議或文件類型的寫法不同但意思相同（例如「107年第1次」與「107年度第1次」、「會議附件」與「議程附件」），算正確；
答案表標為不屬於任何會議的檔案，放在 _待確認/ 或其他獨立資料夾都算正確。
```

**預期行為**：答案表列出每個原始檔名所屬的會議與文件類型，agent 依 INDEX.md 的原始檔名逐一比對，指出分錯的檔案與可能原因。成果可以被驗證，才算真的完成。

**比較看看**：兩人一組，一人照原提示詞做，另一人把步驟 1 的「每個檔案先讀前 2000 字」那句拿掉，比較兩邊花費的時間，以及正確率是否有差別。

#### 延伸 A：做成 skill，處理另一批檔案

先把流程做成 skill：

```text
用 skill-creator 做一個 skill「meeting-organizer」，用來整理混在一起的會議文件，流程如下：
1. 盤點：讀取每個檔案的內容（每個檔案先讀前 2000 字），判斷所屬會議與文件類型，提出分類方案並等我確認。
2. 整理：確認後把檔案「複製」到指定資料夾並改成看得懂的檔名，不修改原始檔案；
   無法判斷屬於哪場會議的檔案放在 _待確認/。
3. 說明：產生 README.md（分類邏輯、統計、異常紀錄）與 INDEX.md（附連結與原始檔名），
   並確認複製後的檔案數和原始檔案數一致。
4. 核對：如果有答案表或清冊才做，並確認 INDEX.md 的連結都指向實際存在的檔案；沒有就略過。
建立在 .claude/skills/meeting-organizer/，並複製一份到 .agents/skills/meeting-organizer/。
做好後先不要測試，也不用跑評估。
```

**重新啟動工作階段**後，不點名 skill，也先不提答案表，直接描述任務：

```text
幫我整理 example/case09/extra_files/ 的會議文件，結果放在 example/case09/organized_extra/。
```

整理完成後，再請它核對：

```text
用 example/case09/teacher/extra_files_答案.csv 核對 example/case09/organized_extra/ 的整理結果。
```

**預期行為**：skill 的 `SKILL.md` 會寫明讀檔方式、分類規則與「確認後才複製」的步驟。整理的提示詞沒有點名 skill，用來觀察它會不會自動觸發；觸發後 agent 盤點完會停下來等你確認，確認後才複製。答案表等整理完才給，避免 agent 照答案分類，核對結果才有意義。這批的檔名多半只有日期（例如 `1041225議程附件.pdf`），會議紀錄的檔名則沒有日期；104～105 年多數會議沒有逐字紀錄，還有幾份附件（行動策略草案、合約條文、盤點表）內容完全沒提到會議，要靠檔名日期與內容交叉判斷。

如果 agent 沒有用到 skill，檢查 `SKILL.md` 開頭的 `description` 有沒有寫到「整理會議文件」這類情境，修改後重新啟動再試一次。

**課後選做：用核對結果修改 skill。** 核對結果有分錯的檔案時，可以請 skill-creator 改進 skill，再測一次：

```text
用 skill-creator 修改 meeting-organizer：依剛才的核對結果找出分錯的原因，
把需要的判斷方法補進 SKILL.md，並說明改了哪裡。
判斷方法要能用在其他批檔案，不要把答案表的內容或個別檔名寫進 skill。
```

**重新啟動工作階段**後，用同一句提示詞整理，但結果改放在 `example/case09/organized_extra_v2/`，再用答案表核對，比較兩次的正確率。

**預期行為**：補進去的應該是通用的判斷方法，例如「檔名只有日期時，用日期對照清冊找出是哪一場會議」，而不是「某個檔案屬於某場會議」；後者只是把答案背下來，換一批檔案就沒用。用同一批檔案測，正確率提高也不代表換一批會變好，這是測試 skill 時要記得的限制。

#### 延伸 B：事後找到的新資料，合併進已整理好的資料夾

整理完之後又找到幾份文件，是很常見的情況。這時不該整批重做，而是讓 agent 先看懂既有的整理結果，再把新資料併進去。

```text
把 example/case09/new_files/ 新找到的文件，合併進已整理好的 example/case09/organized_files/。
請沿用 INDEX.md 既有的分類與命名方式；內容和既有檔案相同的，不要重複放。
先列出合併計畫給我確認，確認後只複製、不動任何既有檔案，最後更新 README.md 與 INDEX.md。
```

合併完成後，再核對：

```text
用 example/case09/teacher/new_files_答案.csv 核對這次合併的結果，
列出每個新檔案的處理方式是否正確，結果存成 example/case09/organized_files/check_merge.md。
```

**預期行為**：agent 先讀 INDEX.md 了解現況，而不是把 `organized_files/` 整個重新整理。`new_files/` 混了三種情況，注意觀察 agent 是否都處理對：

- **新會議**：106 年第 1 次會議的 5 個檔，要依既有命名規則建立新資料夾，不能自創另一套格式；其中逐字稿的檔名同時出現「逐字稿」與「會議紀錄」，要讀內容才知道是哪一類
- **補齊缺件**：108 年第 1 次會議的逐字紀錄，要放進既有的會議資料夾，並把 README.md 裡這筆缺漏紀錄更新掉
- **重複檔**：`簡報(最終版).pptx` 和已整理過的一份簡報內容完全相同，只看檔名認不出來，要比對內容才知道不該再複製

**想一想**：`meeting-organizer` 能處理這種合併嗎？可以用 skill-creator 幫它加上「合併模式」，下次直接說「把新找到的檔案併進去」就能套用。

#### 延伸 C：產生知識庫，再用問題驗證

```text
根據 example/case09/organized_files/ 的會議紀錄，
幫我整理 106～108 年的重點時間軸，存成 example/case09/timeline.md。
每一段都附上出處，文件沒寫的不要猜。
```

**預期行為**：依時間順序列出各場會議的議題與決議，附上出處。

時間軸看起來很完整，但不代表內容正確。問它幾個問題驗證：

```text
以 example/case09/timeline.md 為主回答下面的問題，不夠再查原始文件；
附上出處，並註明答案來自 timeline 還是原始文件，都找不到就說找不到。
答案存成 example/case09/qa.md。
1. 106 年資料開放績效考核的第 1 項權重，從幾分調整成幾分？
2. 106 年度績效考核哪些單位並列第一？
3. 「CC 授權列為甲類授權選項」這個議題，在各次會議怎麼發展？
4. 108 年度兩次會議，各通過新增開放項目幾項？
5. 109 年第 1 次會議做了哪些決議？
```

**預期行為**：對照 `teacher/延伸C_問答答案.md`。

- 答對且來自 timeline：知識庫有用
- 要回頭查原始文件才答得出來：時間軸寫得太簡略，漏了重要內容
- 第 5 題答出內容：出現幻覺，109 年的會議不在資料裡
- 第 3 題要串起三場會議，核對答案是否只寫到原文的程度：原文只寫到「提報行政院討論」與「解除列管」，沒有寫到行政院已經採用。如果答案或時間軸寫成「已經採用」，就是總結比原文誇大

**再做一次**：發現錯誤後，請 agent 依問答結果修正 timeline.md，或把你發現的問題寫進第一段提示詞（例如「總結也要附出處，不要寫成比原文更確定的結論」）重新產生，再問一次同樣的問題，比較前後差異。

#### 延伸 D：交付成果

整理和驗證完成後，最後一步通常是交給別人。這一步會同時用到單元 8 的文件處理 skill。

```text
根據 example/case09/organized_files/ 和 example/case09/timeline.md，做三份交付成果，存到 example/case09/deliverables/：
1. 會議文件清冊.xlsx：每個檔案一列，可以依年度、文件類型篩選
2. 政策演進簡報.pptx：5 頁，給主管看的重點
3. 年度摘要報告.docx：附目錄，另外轉存一份 PDF
內容以 timeline.md 為準，每個重點都附出處。
```

**預期行為**：產出四個檔案（xlsx、pptx、docx、pdf）。打開檢查：

- 清冊的檔案數和 INDEX.md 一致，篩選功能可以用
- 三份成果的數字、決議彼此一致，例如簡報和報告寫的新增開放項目數相同
- 延伸 C 問答發現的問題有沒有被帶進簡報：時間軸總結若寫得比原文誇大，做成簡報後更容易被當成事實，交付前要特別檢查

---

## 常見問題

**Q1：安裝後 agent 好像沒用到 skill？**

- 重新啟動 Claude Code / Antigravity 工作階段
- 確認檔案存在：`.claude/skills/<名稱>/SKILL.md`、`.agents/skills/<名稱>/SKILL.md`
- 在提示詞中明確點名，例如「請使用 frontend-design 設計這個頁面」

**Q2：要裝在專案還是全域？**
預設裝在**目前專案**。若希望所有專案都能用，可加上 `-g`（global）參數。

**Q3：Skill 太多會不會互相干擾？**
Skill 只有在符合 `description` 時才載入完整內容，平常只佔用一小段描述。但功能重疊的 skill 過多時，觸發會變得不精準，所以本課程只挑 12 個；同一個 repo 有很多 skill 時，用 `owner/repo@skill名稱` 只裝需要的。不用的可以移除：

```bash
npx skills remove <skill名稱> -y
```

**Q4：如何更新？**

```bash
npx skills update
```

**Q5：網路上找到的 skill 可以直接裝嗎？**
安裝前先看清楚。Skill 執行時擁有和 agent 一樣的權限，可以讀寫檔案、執行指令。安裝時工具會顯示風險評估（例如 Low Risk、Med Risk），建議：

- 優先選官方（例如 `anthropics/skills`）或下載數多的 skill
- 安裝前打開 GitHub 上的 `SKILL.md` 與附帶的腳本，看看它會做什麼
- 標示 Med Risk 以上的，確認原因再裝。例如本課程的 `arxiv` 會連線到外部 API，`pdf` 會執行處理檔案的腳本，這些行為符合它們的用途

**Q6：自己做的 skill 怎麼分享給別人？**
Skill 就是一個資料夾，有兩種分享方式：

- 直接複製：把 `.claude/skills/<名稱>/`（Antigravity 為 `.agents/skills/<名稱>/`）整個資料夾給對方，放到對方專案的同一個位置，重新啟動工作階段即可
- 放上 GitHub：把資料夾放進 repo 的 `skills/` 目錄，對方就能用 `npx skills add <你的帳號>/<repo>@<名稱> -a antigravity -a claude-code --copy -y` 安裝

---

## 附錄：一次安裝全部

> 本課程已經裝好，課堂上不要執行。這裡是給你在自己的專案重建同一組 skill 時參考。

```bash
npx skills add anthropics/skills@frontend-design -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@canvas-design -a antigravity -a claude-code --copy -y
npx skills add remotion-dev/skills@remotion-best-practices -a antigravity -a claude-code --copy -y
npx skills add NousResearch/hermes-agent@arxiv -a antigravity -a claude-code --copy -y
npx skills add master-cai/research-paper-writing-skills@research-paper-writing -a antigravity -a claude-code --copy -y
npx skills add obra/superpowers@brainstorming -a antigravity -a claude-code --copy -y
npx skills add vercel-labs/skills@find-skills -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@skill-creator -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@docx -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@pdf -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@pptx -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@xlsx -a antigravity -a claude-code --copy -y
```

專案根目錄的 [install.sh](install.sh) 是相同的指令清單。Windows 的 PowerShell 不能直接執行 `.sh` 檔，請逐行複製貼到終端機執行。

**參考連結**

- Skills 目錄與排行榜：<https://skills.sh/>
- Anthropic Skills：<https://github.com/anthropics/skills>
- Remotion：<https://www.remotion.dev/>
- arXiv API：<https://info.arxiv.org/help/api/>
- Superpowers（brainstorming 出處）：<https://github.com/obra/superpowers>
- Research Paper Writing Skills：<https://github.com/master-cai/research-paper-writing-skills>
- 臺灣高級中等學校校級面板資料：<https://github.com/gemini960114/tw-highschool-panel>
