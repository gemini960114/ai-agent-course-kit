# 教師手冊：課程總覽

```text
teacher/
├── README.md            ← 本文件：課程總覽、課前準備、上課前檢查清單
├── 02-answers.md        ← 階段二參考答案
├── 05-course-plan.md    ← 階段五課程規劃與評分
├── 05-answers.md        ← 階段五參考答案
└── 07-demo-script.md    ← 階段七教師示範腳本（課前準備、Remote-SSH 設定、示範流程）
```

> 參考答案會一起上傳 GitHub，學生看得到也沒關係。除了階段一，學生練習時都是用 Antigravity IDE 開啟**單一階段的資料夾**（或複製到「文件」的資料夾），AI 不會讀到這裡。階段一安裝時會開啟教材的最上層資料夾，這時 AI 看得到 `teacher/`，靠根目錄 AGENTS.md 的規則要求 AI 不主動讀取。
>
> 階段六的答案表在 `06-agent-skills/example/case09/teacher/`，跟著練習資料夾一起放；由 `06-agent-skills/AGENTS.md` 規定 AI 只有提示詞指定時才能讀取。

---

## 七個階段

| 階段 | 資料夾 | 時間 | 學生學到什麼 | 教師資料 |
| --- | --- | --- | --- | --- |
| 一 | `01-install/` | 模組一約 15～30 分鐘；模組二、三可課後安裝（階段六需要模組三） | 安裝開發環境 | — |
| 二 | `02-organize-data/` | 約 30 分鐘 | 請 AI 整理文獻比較表，並**檢查 AI 有沒有編造內容** | `02-answers.md` |
| 三 | `03-hello-github/` | 約 30 分鐘 | 登入 GitHub，用 git 存版本、推上 GitHub | — |
| 四 | `04-web-game/` | 約 30～40 分鐘 | 用自然語言請 AI 做出網頁小遊戲，並自己玩一輪檢查 AI 說的「完成」 | — |
| 五 | `05-review-loop/` | 兩次課，各 90 分鐘 | 用另一個 AI 交叉審查，自己判斷要不要採納 | `05-course-plan.md`、`05-answers.md` |
| 六 | `06-agent-skills/` | 課堂 2 小時＋課後自學 | 用 skill 產出網頁、海報、論文與 Office 文件，並用 `skill-creator` 把整理流程做成自己的 skill | `06-agent-skills/tutorial.md` 開頭的課程時間規劃；`example/case09/teacher/` 答案表 |
| 七 | `07-hpc-demo/` | 約 20～30 分鐘（**教師示範**，學生不操作） | 看 AI 在超級電腦上操作真實研究管線，以及 AI 在真實運作中犯過的 20 個錯誤 | `07-demo-script.md` |

**貫穿全課程的主軸：AI 很快，但會出錯，要自己檢查。** 階段二是第一次發現（AI 會補寫摘要沒有的內容），階段四是自己動手驗證 AI 說的「完成」，階段五是有系統地檢查（交叉審查），階段六把做事的方法寫成 skill，但成果仍要自己核對。

## 依對象選擇路線

時間有限時，不一定每個階段都要上。05 和 06 可以依對象擇一，時間夠就兩個都上（先 05 再 06）：

| 對象 | 建議路線 | 說明 |
| --- | --- | --- |
| **教育、統計相關系所** | 01 → 02（`dropout-edu`）→ 03 → **06** | 06 的單元 5 用高中校級資料寫研究論文，單元 9 整理會議文件 |
| **工學院** | 01 → 02（`landslide-eng`）→ 03 → 04 → **05** | 04 網頁遊戲與 05 程式審查較貼近工程背景 |
| **時間充裕（完整課程）** | 01 → 02 → 03 → 04 → **05** → **06** | 05 先練判斷 AI，06 再把做法寫成 skill；06 的單元 7-2 範例 2 把 05 的審查流程做成 skill |

**07 教師示範**適合放在任一路線的最後，作為「研究規模變大時，AI 協作會變成什麼樣子」的展望。

---

## 課前準備（請學生先完成）

- [ ] 註冊 GitHub 帳號
- [ ] 安裝 AI 編輯器 Antigravity IDE（[01-install/00-antigravity.md](../01-install/00-antigravity.md)；手動下載安裝，並用 Google 帳號登入）
- [ ] 完成階段一的**模組一**（Git、uv、Node.js、gh）
- [ ] 階段五需要**兩個不同的 AI**：Antigravity IDE 寫程式，另一個網頁版 AI（例如 ChatGPT）審查。審查用的 AI 要和 Antigravity 目前使用的**模型**不同
- [ ] 階段六前完成階段一的**模組三**（Pandoc、LaTeX）。MacTeX 下載達數 GB，請學生在家中網路先裝好

---

## 上課前檢查清單（老師）

| 項目 | 為什麼 | 怎麼確認 |
| --- | --- | --- |
| **edge-tts 是否正常** | 依賴微軟線上服務，偶爾會整體失效（2026-10 曾出現 403 錯誤，見 [rany2/edge-tts#490](https://github.com/rany2/edge-tts/issues/490)） | 執行 `edge-tts --text "測試" --write-media test.mp3`，有產生檔案即正常。失效時，階段四的音效改用 ffmpeg（README 已是預設做法） |
| **arXiv 論文狀態** | 論文可能被撤回或改版（階段二曾有一篇被撤回而更換） | 打開 `02-organize-data/` 各篇的 arXiv 連結，確認沒有標示 withdrawn |
| **階段四 GitHub Pages** | 選做步驟**尚未實測**，需要 public repo | 自己先用一個測試 repo 跑一次 |
| **macOS 安裝指南** | **尚未在實機上測試**過 | 找一台 Mac 跑完模組一到三 |
| **公用電腦** | 學生的 GitHub 登入會留在電腦上 | 課後提醒學生執行 `gh auth logout` |
| **階段六的 skill** | skill 已預先放在 `06-agent-skills/.agents/skills/` 與 `.claude/skills/`；學生若開錯資料夾，skill 不會被載入 | 用 Antigravity 開啟 `06-agent-skills/`，問 AI「目前有哪些 skill 可以用？」，確認列出 12 個課程 skill |
| **階段六的 LaTeX** | 單元 5 輸出 PDF 需要 xelatex；MiKTeX 第一次編譯會自動下載套件 | 在 `06-agent-skills/` 執行 `xelatex --version`；課前自己先跑一次單元 5 的 PDF 輸出 |
| **階段七的遠端連線** | 示範要從教室連到 Nano4，學校網路可能擋 2222 埠；recon-all 每例需數小時 | 依 `07-demo-script.md` 第一節完成課前準備：教室實測連線、前一天先跑好示範批次；網路不通時改播示範影片（連結見 `07-demo-script.md`） |

---

## 修改教材時要注意

| 修改 | 要同步的地方 |
| --- | --- |
| `05-review-loop/REVIEW-LOOP.md` | `05-review-loop/exercise/grade-stats/REVIEW-LOOP.md`（起始資料夾的副本，兩份必須相同） |
| `grades.csv` | `teacher/05-answers.md` 的正確答案；檔案必須保留 BOM 與 CRLF（`.gitattributes` 已設定） |
| `06-agent-skills/.claude/skills/` 的 skill | `06-agent-skills/.agents/skills/` 的同名 skill（兩份必須相同）；`skills-lock.json` 與 `install.sh` |
| 階段二的論文 | `teacher/02-answers.md` |
| `06-agent-skills/example/case09/` 的素材 | `06-agent-skills/example/case09/teacher/` 的答案表 |
| 新增任何階段的答案 | 檔名用 `NN-answers.md`，與其他答案一致 |
