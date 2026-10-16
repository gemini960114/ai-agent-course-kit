# 練習題：CSV 成績統計小程式

用 AI 寫一個 Python 小程式，再用「AI 交叉審查流程」把它改到可以發布。  
**這份作業的重點不是程式本身，而是你的審查判斷紀錄。**

流程請依照 [REVIEW-LOOP.md](../REVIEW-LOOP.md)，示範案例見 [example](../example/README.md)。

---

## 一、程式需求

完整需求在起始資料夾的 [REQUIREMENTS.md](grade-stats/REQUIREMENTS.md)。摘要：讀取 `grades.csv`，輸出各科統計（母體標準差）、不及格名單、缺考名單、資料問題、重複學號；用 uv 管理，標準函式庫就能完成（使用第三方套件須說明理由）。

---

## 二、作業步驟

老師已經準備好起始資料夾 [grade-stats](grade-stats/)，裡面有：

```text
grade-stats/
├── README.md        ← 從這裡開始：三個步驟
├── REQUIREMENTS.md  ← 程式需求（AI 寫程式與審查者檢查時都以這份為準）
├── REVIEW-LOOP.md   ← 審查流程與提示語範本
├── grades.csv       ← 測試資料
├── AGENTS.md        ← AI 規則（要用 uv、不准 pip install 等）
├── .gitignore       ← 排除 __pycache__ 等暫存檔，避免被 commit
└── review-log/      ← 放每一輪的審查紀錄
```

把**整個 `grade-stats` 資料夾複製到教材資料夾以外的地方**（例如「文件」底下），用 Antigravity IDE 開啟它，再執行 `git init` 與 `uv init --bare`。

> 複製前先確認「文件」裡沒有同名的 `grade-stats` 資料夾；若已存在，請先改名備份，避免新舊檔案混在一起。

> 為什麼不能直接在教材資料夾裡做？AI 工具會讀取整個開啟的資料夾，在自己的專案資料夾裡練習，AI 才只會看到你的專案。

Windows（PowerShell，在教材資料夾中執行）：

```powershell
Copy-Item -Recurse 05-review-loop\exercise\grade-stats $HOME\Documents\grade-stats
cd $HOME\Documents\grade-stats
git init
uv init --bare
antigravity-ide .
```

macOS（終端機，在教材資料夾中執行）：

```zsh
cp -R 05-review-loop/exercise/grade-stats ~/Documents/grade-stats
cd ~/Documents/grade-stats
git init
uv init --bare
antigravity-ide .
```

**之後的作業都在這個資料夾裡進行**，AI 工具也在這裡開啟。

> 不想用指令的話：用檔案總管（Finder）把 `grade-stats` 資料夾複製到「文件」，在 Antigravity IDE 選「檔案 → 開啟資料夾」（File → Open Folder）開啟它，再在 Antigravity IDE 的終端機執行 `git init` 與 `uv init --bare`。

1. **第 0 輪：產出。** 確認已執行 `uv init --bare`，再對 AI 說「請依照 REQUIREMENTS.md 寫出程式，並用 grades.csv 執行一次」，確認可以執行後執行 `git add -A` 與 `git commit -m "第 0 輪：初版"`。
2. **第 1 輪以後：交叉審查。** 依 REVIEW-LOOP.md 的四個步驟進行，每一輪：
   - `review-log/round-N-prompt.md`：給審查者的 prompt
   - `review-log/round-N-review.md`：審查者回覆的原文
   - `review-log/round-N-decision.md`：你的逐項判斷與理由
   - 程式實際執行成功後 commit 一次，三個檔案和這一輪的修改一起 commit，例如 `git commit -m "第 N 輪：接受 #1 #3，否決 #2"`（部分接受算在「接受」；全部否決時寫 `"第 N 輪：否決 #1 #2"`）
3. **停止條件：** 完全依照 REVIEW-LOOP.md：一位與寫程式不同工具、不同模型的 AI 審查者對**最後的版本**判定「可以發布」，且最後的版本已用 `grades.csv` 實際執行確認輸出正確。**本作業至少要做 2 輪**：即使第 1 輪就判定可以發布，也請再做 1 輪確認。最後一輪的 commit 訊息改用 `"審查完成：共 N 輪（第 N 輪：接受 #1，否決 #2）"`，這一輪沒有修改時只寫 `"審查完成：共 N 輪"`。

> 每一輪都 commit：git 記錄「改了什麼」，`review-log/` 記錄「為什麼改」。用 `git log --oneline` 能看到每一輪的變化；某一輪改壞了，可以從 git 找回那一輪之前的程式。

**產出用與審查用請使用不同的 AI 工具，並確認兩者使用不同的模型。**

### 每一輪要輸入的 Prompt（照順序複製）

| 順序 | 貼給誰 | 輸入 |
| --- | --- | --- |
| 第 0 輪 | 寫程式的 AI（Antigravity） | Prompt A，執行成功後 commit |
| 每一輪 ② | 寫程式的 AI | Prompt B，**檢查**產生的 `round-N-prompt.md` 裡的「已決定的事」 |
| 每一輪 ③ | 審查用的 AI（例如 ChatGPT 網頁版） | Prompt C，回覆原文存成 `round-N-review.md` |
| 每一輪 ④ | 寫程式的 AI | Prompt D，**自己看過判斷**後再輸入 Prompt E，執行成功後 commit |

#### Prompt A：第 0 輪，寫出程式

```text
請依照 REQUIREMENTS.md 寫出程式，並用 grades.csv 執行一次。
```

看執行結果，自己對照 `REQUIREMENTS.md` 和 `grades.csv`，想想它算對了嗎？

#### Prompt B：步驟 ②，產生審查 prompt

```text
請先執行 git status，確認沒有未 commit 的修改。如果有，先停下來告訴我，不要產生 prompt
（最常見的原因是上一輪套用修改後忘了 commit）。

確認沒有之後，幫我寫一段給另一位 AI 專家的審查 prompt，存到 review-log/ 的下一輪 prompt 檔。
開頭寫上：第幾輪、目前 commit 編號（git rev-parse --short HEAD 的結果）。
你只負責填寫「專案用途」「已決定的事」「前幾輪已修正與已否決的項目」（從 review-log/ 整理）。
以下規則必須逐字放進審查 prompt，不得改寫或省略：

- 只讀檔案，不要執行任何指令或修改任何設定。
- 依 🔴 一定要修／🟡 建議修 回報，每項寫明檔案與位置、問題、原因、建議修改。
- 不確定的地方請標「不確定」，不要猜測。
- 沒有重大問題就直接說「可以發布」。
```

#### Prompt C：步驟 ③，貼給審查用的 AI

程式分成多個檔案時，每個 `.py` 檔都要貼。

```text
（貼上 round-N-prompt.md 的全部內容）

本次共提供以下 N 個檔案：（列出檔名）。請在回覆開頭列出你實際收到的檔案；
若有缺少或內容不完整，請先說明，不要審查缺少的部分。

以下是專案檔案的內容：

===== REQUIREMENTS.md =====
（貼上內容）

===== grades.py =====
（貼上內容）

===== grades.csv =====
（貼上內容）
```

#### Prompt D：步驟 ④，逐項判斷（先不修改）

```text
請逐項判斷以下審查建議（接受／部分接受／否決），附上可驗證的理由，先不要修改：
（貼上審查原文）
```

有不同意的判斷，先和 AI 討論，確定後再輸入 Prompt E。

#### Prompt E：步驟 ④，套用並記錄

```text
只套用同意的項目，修改後實際執行一次，並把判斷存到 review-log/ 的這一輪 decision 檔。
```

確認程式實際執行成功後，commit 這一輪（`review-log/` 的三個檔案一起）：

```powershell
git add -A
git commit -m "第 N 輪：接受 #1 #3，否決 #2"
```

完成一輪後，回到 Prompt B 開始下一輪，直到符合停止條件。最後一輪的 commit 訊息改用 `"審查完成：共 N 輪（第 N 輪：接受 #1，否決 #2）"`。

---

## 三、繳交內容

```text
grade-stats/
├── grades.py（或你的程式結構）
├── pyproject.toml
├── grades.csv、AGENTS.md、REQUIREMENTS.md、REVIEW-LOOP.md
├── review-log/
│   ├── round-1-prompt.md
│   ├── round-1-review.md
│   ├── round-1-decision.md
│   └── …（至少 2 輪）
└── .git/
```

另外繳交一段 **100～200 字的心得**：你否決了哪一個建議？你是怎麼確認審查者說錯的？

---

## 四、評分重點

| 項目 | 比重 |
| --- | --- |
| 判斷紀錄：每一項（包括接受的建議）都有判斷與**可以驗證**的理由，能連回需求、實際執行或官方文件 | 40% |
| 個人判斷抽核：老師隨機指定一項接受與一項否決，你能說明並重現查證方法 | 10% |
| 審查 prompt：有背景、已決定事項、只讀不執行、回報格式，並標示輪次與 commit 編號 | 20% |
| 程式用 `grades.csv` 執行的結果正確 | 20% |
| git 紀錄：第 0 輪初版、每一輪各一次 commit，commit 訊息標明輪次與接受／否決的項目編號 | 10% |

**加分：** 找到審查者說錯的地方，並用實際執行結果或官方文件證明。
