# 成績統計練習：從這裡開始

| 檔案 | 用途 |
| --- | --- |
| `REQUIREMENTS.md` | 程式要做什麼 |
| `REVIEW-LOOP.md` | 審查流程與可以直接複製的提示語 |
| `AGENTS.md` | 給 AI 的規則（AI 工具會自動讀取） |
| `grades.csv` | 測試資料（不要修改） |
| `review-log/` | 每一輪的審查紀錄放這裡 |
| `.gitignore` | 讓 git 忽略 `__pycache__` 等暫存檔（不用修改） |

---

## Step 1：初始化（只做一次）

在 Antigravity IDE 選單「終端機 → 新增終端機」（Terminal → New Terminal）開啟終端機，執行：

```powershell
git init
uv init --bare
```

完成後會多出 `pyproject.toml`。

> 一定要加 `--bare`：不加的話，`uv init` 會另外產生 `README.md`、`.git` 與範例程式（依 uv 版本不同，可能是 `main.py` 或 `src/` 資料夾），不適合這個練習。

## Step 2：第 0 輪，請 AI 寫程式

1. 在這個 Antigravity IDE 視窗開啟 AI 面板，輸入：
   ```text
   請依照 REQUIREMENTS.md 寫出程式，並用 grades.csv 執行一次。
   ```
2. 看執行結果，自己對照 `REQUIREMENTS.md` 和 `grades.csv`，想想它算對了嗎？
3. 確認可以執行後，做第一次 commit：
   ```powershell
   git add -A
   git commit -m "第 0 輪：初版"
   ```

## Step 3：第 1 輪以後，交叉審查

照 `REVIEW-LOOP.md` 的步驟 ②～④，每一輪做四件事，前三件各在 `review-log/` 存一個檔案：

1. **② 產生審查 prompt**：把 REVIEW-LOOP.md 步驟 ② 的提示語貼給**寫程式的 AI**。它會先檢查 git status，確認沒有未 commit 的修改（有的話，多半是上一輪忘了 commit，先補上），再存成 `round-N-prompt.md`，開頭標明第幾輪與 commit 編號。**檢查裡面的「已決定的事」**，刪掉你沒決定過的項目。
2. **③ 交給另一個 AI 審查**：把 prompt 貼給**不同 AI 工具、且使用不同模型**的 AI（例如 ChatGPT 或 Gemini）。網頁版讀不到你的檔案，要把檔案內容一起貼上（程式分成多個檔案時，每個 `.py` 檔都要貼）：
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
   **回覆原文由你自己存成 `round-N-review.md`。**
3. **④ 逐項判斷**：把回覆貼回寫程式的 AI，用步驟 ④ 的提示語請它逐項判斷。**自己確認判斷**，再用第二段提示語請它套用、實際執行，並存成 `round-N-decision.md`。
4. **commit 這一輪**：確認程式實際執行成功後，把這一輪的修改和三個紀錄檔一起 commit：
   ```powershell
   git add -A
   git commit -m "第 N 輪：接受 #1 #3，否決 #2"
   ```
   訊息列出這一輪接受與否決的項目編號（部分接受算在「接受」，「已處理」不列入）；全部否決時寫 `"第 N 輪：否決 #1 #2"`；沒有任何建議時寫 `"第 N 輪：無建議"`。

重複 Step 3，直到符合 REVIEW-LOOP.md 的「停止條件」（本作業**至少 2 輪**）。最後一輪的 commit 訊息改用：

```powershell
git add -A
git commit -m "審查完成：共 N 輪（第 N 輪：接受 #1，否決 #2）"
```

這裡接受的只限不影響程式行為的修改，例如註解或文字。這一輪沒有修改時，只寫 `"審查完成：共 N 輪"`。
