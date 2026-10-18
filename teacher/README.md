# 教師手冊

```text
teacher/
├── README.md            ← 本文件：課程總覽、課前準備、上課前檢查清單
├── 02-answers.md        ← 階段二參考答案
├── 05-course-plan.md    ← 階段五課程規劃與評分
├── 05-answers.md        ← 階段五參考答案
├── 07-demo-script.md    ← 階段七老師示範腳本（課前準備、Remote-SSH 設定、示範流程）
└── review-log/          ← 這份教材的交叉審查紀錄（依 05 的 REVIEW-LOOP 流程）
```

> 參考答案會一起上傳 GitHub，學生看得到也沒關係。除了階段一和階段三的 Step 1（登入 GitHub），學生練習時都是用 Antigravity IDE 開啟**單一階段的資料夾**（或自己在「文件」建立的資料夾），AI 不會讀到這裡。這兩個步驟會開啟教材的最上層資料夾，這時 AI 看得到 `teacher/`，靠根目錄 AGENTS.md 的規則要求 AI 不主動讀取。
>
> 階段六的答案表在 `06-agent-skills/example/case09/teacher/`，跟著練習資料夾一起放；由 `06-agent-skills/AGENTS.md` 規定 AI 只有提示詞指定時才能讀取。

---

## 八個階段

| 階段 | 資料夾 | 時間 | 學生學到什麼 | 教師資料 |
| --- | --- | --- | --- | --- |
| 一 | `01-install/` | 模組一約 15～30 分鐘；模組二、三可課後安裝（階段六需要模組二、三） | 安裝開發環境 | — |
| 二 | `02-organize-data/` | 約 30 分鐘 | 請 AI 整理文獻比較表，並**檢查 AI 有沒有編造內容** | `02-answers.md` |
| 三 | `03-hello-github/` | 約 30 分鐘 | 登入 GitHub，用 git 存版本、推上 GitHub | — |
| 四 | `04-web-game/` | 約 30～40 分鐘 | 用自然語言請 AI 做出網頁小遊戲，並自己玩一輪檢查 AI 說的「完成」 | — |
| 五 | `05-review-loop/` | 兩次課各 90 分鐘；只有一次課時用 90 分鐘精簡版（見 `05-course-plan.md`） | 用另一個 AI 交叉審查，自己判斷要不要採納 | `05-course-plan.md`、`05-answers.md` |
| 六 | `06-agent-skills/` | 課堂 2 小時＋課後自學 | 用 skill 產出網頁、海報、論文與 Office 文件，並用 `skill-creator` 把整理流程做成自己的 skill | `06-agent-skills/tutorial.md` 開頭的課程時間規劃；`example/case09/teacher/` 答案表 |
| 七 | `07-hpc-demo/` | 約 20～30 分鐘（**老師示範**，學生不操作） | AI 指揮官：看老師用自然語言指揮 AI 在超級電腦上操作真實研究管線，以及 AI 在真實運作中犯過的 20 個錯誤 | `07-demo-script.md` |
| 八（選修） | `08-opencode/` | 約 60 分鐘（OpenCode 請學生課前安裝；時間規劃見 `08-opencode/tutorial.md` 開頭） | 用 OpenCode 把 Skill、Command、Agent 寫成設定檔，做出 `edit: deny` 的作業助教；**提示詞是請求，權限是規則** | `08-opencode/example/hw-grader/`（完成版設定檔）；簡報與講解影片在 Google Drive |

**貫穿全課程的主軸：AI 很快，但會出錯，要自己檢查。** 階段二是第一次發現（AI 會補寫摘要沒有的內容），階段四是自己動手驗證 AI 說的「完成」，階段五是有系統地檢查（交叉審查），階段六把做事的方法寫成 skill，但成果仍要自己核對；選修的階段八再往前一步，用權限讓 AI 不能做某些事，不只靠它自律。

## 學習路徑建議

學習路徑放在給學生看的課程總覽，見 [README.md](../README.md#學習路徑建議)。

---

## 課前準備（請學生先完成）

- [ ] 註冊 GitHub 帳號
- [ ] 安裝 AI 編輯器 Antigravity IDE（[01-install/00-antigravity.md](../01-install/00-antigravity.md)；手動下載安裝，並用 Google 帳號登入）
- [ ] 完成階段一第 2 步**取得教材**，以及第 3 步的**模組一**（Git、uv、Node.js、gh）
- [ ] 階段五需要**兩個不同的 AI**：Antigravity IDE 寫程式，另一個網頁版 AI（例如 ChatGPT）審查。審查用的 AI 要是**不同 AI 工具、且使用不同模型**
- [ ] 確認電腦符合需求：Windows 10／11 64 位元，或 macOS 12 以上的 Apple Silicon Mac（**不支援 Intel Mac**）
- [ ] 階段六前完成階段一的**模組二、三**（ffmpeg、edge-tts、Pandoc、LaTeX 等）。MacTeX 下載達數 GB，請學生在家中網路先裝好
- [ ] 要上階段八（選修）時，請學生依 `08-opencode/tutorial.md` 第 1 步先裝好 OpenCode v1，並確認有一個可以使用的模型（OpenCode Zen 的免費模型，或學校的模型服務）

---

## 上課前檢查清單（老師）

| 項目 | 為什麼 | 怎麼確認 |
| --- | --- | --- |
| **edge-tts 是否正常** | 依賴微軟線上服務，偶爾會整體失效（2026-10 曾出現 403 錯誤，見 [rany2/edge-tts#490](https://github.com/rany2/edge-tts/issues/490)） | 執行 `edge-tts --text "測試" --write-media test.mp3`，有產生檔案即正常。失效時，階段四的音效改用 ffmpeg（README 已是預設做法） |
| **arXiv 論文狀態** | 論文可能被撤回或改版（階段二曾有一篇被撤回而更換） | 打開 `02-organize-data/` 各篇的 arXiv 連結，確認沒有標示 withdrawn |
| **階段四 GitHub Pages** | 選做步驟，需要 public repo。**已實測**（2026-10-15，[my-game](https://gemini960114.github.io/my-game/)） | 每學期開課前，打開範例網址確認仍可開啟 |
| **macOS 安裝指南** | **略過（無設備）**：沒有 Apple Silicon Mac 可以實測，本課程只支援 Apple Silicon | 有 Mac 的學生上課時，請他回報模組一到三的驗證結果；遇到問題時以 Windows 版的步驟對照排除 |
| **階段五每輪 commit 的流程** | 2026-10-16 改版後**尚未實測**（之前的紀錄是舊流程） | 用新版 grade-stats 跑至少 2 輪，確認：Prompt B 會先執行 `git status`，有未 commit 的修改時停下來；`round-N-prompt.md` 開頭有輪次與正確的 commit 編號；審查者會在回覆開頭列出收到的檔案；每輪 commit 訊息的格式正確 |
| **階段六單元 6 課堂版** | 第 1 輪審查後新增，**尚未實測**；課程表只給 10 分鐘（之前只做過完整版） | 用 Antigravity 開啟 `06-agent-skills/`，貼上課堂版第一段提示詞並計時；確認 `example/case06/source/` 沒有被修改、`improvement-plan.md` 產生在 `example/case06/` |
| **階段六單元 7-2 範例 2** | 第 1 輪審查後新增，2026-10-16 又改了提示詞，**尚未實測** | 完整跑一輪：產生 prompt → 交給另一個工具、不同模型審查 → 存審查原文 → 逐項判斷 → 確認 skill 停下來等你決定，結果記在 `teacher/review-log/`。另外確認：只檢查待審檔案（`git status -- <檔案>`）；在不是 git repo 的資料夾（例如 ZIP 下載的教材）會改寫修改時間，不會出錯 |
| **階段六的選做 skill** | 2026-10-17 新增的 webapp-testing（單元 1）、grilling（單元 6）、theme-factory（單元 8）都是學生自行安裝、用完移除；安裝與移除指令已實測，**在 Antigravity 裡的完整操作尚未實測** | 各照教材跑一次：安裝 → 重新啟動 → 練習 → 移除，確認移除後 `.agents/skills/`、`.claude/skills/` 只剩 12 個課程 skill，`skills-lock.json` 也還原 |
| **階段六單元 9 延伸 A** | 課堂上排 30 分鐘，**尚未實測** | 照延伸 A 做出 `meeting-organizer`，重新啟動後整理 `extra_files/`，用答案表核對；記下花費時間，確認 skill 會自動觸發並在盤點後停下來等確認 |
| **公用電腦** | 學生的 GitHub 登入會留在電腦上 | 課後提醒學生執行 `gh auth logout` |
| **階段六的 skill** | skill 已預先放在 `06-agent-skills/.agents/skills/` 與 `.claude/skills/`；學生若開錯資料夾，skill 不會被載入 | 用 Antigravity 開啟 `06-agent-skills/`，問 AI「目前有哪些 skill 可以用？」，確認列出 12 個課程 skill |
| **階段六的 LaTeX** | 單元 5 輸出 PDF 需要 xelatex；MiKTeX 第一次編譯會自動下載套件 | 在 `06-agent-skills/` 執行 `xelatex --version`；課前自己先跑一次單元 5 的 PDF 輸出 |
| **階段七的遠端連線** | 示範要從教室連到 Nano4，學校網路可能擋 2222 埠；recon-all 每例需數小時 | 依 `07-demo-script.md` 第一節完成課前準備：教室實測連線、前一天先跑好示範批次；網路不通時改播示範影片（連結見 `07-demo-script.md`） |
| **階段八的 OpenCode v1 行為** | 2026-10-18 新增，教材依官方文件撰寫，**尚未在 1.19.3 實測**；老師電腦若已裝 OpenCode 2，可用 `npx opencode-ai@1.19.3` 臨時執行 | 照 `08-opencode/tutorial.md` 完整跑一次，確認：Plan 改檔前是詢問還是直接禁止（第 4 步的寫法依結果修正）；`/check` 是否交給 ta 在另一個對話執行、你仍停在 Build；請 `@ta` 改 `grade.py` 時確實被擋下，且第 9 步對照實驗（拿掉提示詞的「不修改」規則）中 ta 的實際反應和教材描述一致；第 8 步實驗中 AI 改檔的頻率；`reference.md` 提到的 `--auto` 參數在 1.19.3 是否存在、是否仍擋下 `deny`；各步驟實際花費時間是否符合 60 分鐘的規劃 |

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
| `08-opencode/tutorial.md` 裡的設定檔與 `grade.py` | `08-opencode/example/hw-grader/` 的同名檔案（內容必須相同）；Google Drive 上的 OpenCode 簡報與講解影片 |
| 新增要放上教學網站的 Markdown 檔 | `scripts/sync-docs.mjs` 的 `SOURCES` 與 `docs/.vitepress/config.js` 的側欄；改階段名稱時也要同步側欄、導覽列與 `docs/index.md` 的首頁卡片 |
