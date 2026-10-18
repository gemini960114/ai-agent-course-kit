# OpenCode 入門：做出你的作業助教

> 適用：OpenCode v1（測試版本 1.19.3）

全程使用同一個專案 `hw-grader`。做完後，專案裡會多出 4 個設定檔：

```text
hw-grader/
├── grade.py                              ← 範例程式（故意留了錯誤）
├── .agents/skills/hw-checklist/SKILL.md  ← Skill：檢查作業的做法
├── .opencode/agents/ta.md                ← Agent：助教，不能改檔
└── .opencode/commands/
    ├── commit.md                         ← Command：/commit
    └── check.md                          ← Command：/check，交給 ta 執行
```

完成版放在 [example/hw-grader/](example/hw-grader)，做完可以對照。

---

## 1. 安裝 OpenCode

OpenCode 有終端機版、桌面版和 VS Code 擴充功能，這個階段用**終端機版**，設定檔和指令都看得最清楚。

在終端機執行（Windows 與 macOS 相同）：

```text
npm install -g opencode-ai@1.19.3
opencode --version
```

看到 `1.19.3` 就完成了。

> - 套件名稱是 `opencode-ai`，不是 `opencode`。
> - **不要**執行 `opencode upgrade --major`；看到 OpenCode 2 的升級提示，按 Dismiss 略過。macOS 也不要用 `brew install opencode`，Homebrew 的版本已經換成 OpenCode 2。
> - Windows 執行 `npm` 被擋時，改用 `npm.cmd`（見 [AGENTS.md](../AGENTS.md) 第 5 節）。

## 2. 建立作業專案

在「文件」裡建立專案，路徑不要有空白或中文：

Windows（PowerShell）：

```powershell
cd $HOME\Documents
mkdir hw-grader
cd hw-grader
git init
uv init --bare
uv add --dev pytest
```

macOS：

```bash
cd ~/Documents
mkdir hw-grader
cd hw-grader
git init
uv init --bare
uv add --dev pytest
```

接著用編輯器在 `hw-grader` 裡建立 `grade.py`：

```python
def calc_average(a, b, c):
    return (a + b + c) / 3


if __name__ == "__main__":
    scores = [85, 92, "78"]
    print("學期平均：", calc_average(*scores))
```

這支程式**故意**留了幾個問題：分數混進字串 `"78"`，執行會出現 `TypeError`；沒有 docstring；變數名稱 `a`、`b`、`c` 看不出意義；沒有檢查分數是否在 0～100；也沒有測試。後面的助教會把這些找出來。

最後在 `hw-grader` 裡啟動 OpenCode：

```text
opencode
```

> **為什麼要先 `git init` 再啟動？** OpenCode 的「回到上一步」要靠 Git 才能把檔案一起還原。如果 OpenCode 開著才 `git init`，這次啟動不會記錄檔案快照，請 `/exit` 離開後重新啟動。
>
> Windows 執行 Python 時中文變成亂碼，先在 PowerShell 執行 `$env:PYTHONUTF8="1"`，再啟動 `opencode`。

## 3. 接上模型

1. 輸入 `/connect`，選擇模型供應商。可以先試 **OpenCode Zen** 標示 Free 的模型，是否需要登入以當天畫面為準。
2. 其他供應商要到供應商網站建立 API 金鑰，複製後貼回 OpenCode。
3. 輸入 `/models` 選模型。目前的模型顯示在輸入框下方。

> 金鑰不要寫進程式碼，也不要 commit 到 Git。學校或單位有自己的模型服務（例如國網中心的 LiteLLM），見 [reference.md](reference.md#1-接上自己的模型服務)。

## 4. 基本操作

### 三個符號

| 符號 | 用途 | 範例 |
| --- | --- | --- |
| `@` | 引用檔案，內容會放進對話 | `@grade.py 這個函式在算什麼？` |
| `!` | 在輸入框最前面按 `!` 進入 Shell 模式，執行終端機指令，輸出 AI 看得到；按 Esc 離開 | `!uv run grade.py` |
| `/` | OpenCode 的內建指令 | `/models`、`/new`、`/sessions` |

### 兩個內建 Agent：Build 與 Plan

按 **Tab** 切換：

- **Build**（預設）：會直接改檔、執行指令，用來實作。
- **Plan**：用來規劃。改檔和執行指令前會先詢問你。

試試看：

1. 輸入 `!uv run grade.py`，讓 AI 看到 `TypeError`。
2. 在 Build 輸入：`@grade.py 上面的錯誤是什麼原因？先不要改`

好 Prompt 三要素：**給檔案（`@`）、給證據（`!`）、說清楚要不要改檔。**

### 常用按鍵

| 操作 | 按鍵 |
| --- | --- |
| 送出 | Enter |
| 換行 | Ctrl+J |
| 中斷 AI | Esc（中斷不會還原已經改過的檔案） |
| 選取文字 | 按住 Shift 再用滑鼠拖曳 |
| 複製選取的文字 | Ctrl+Shift+C（Windows Terminal）；**不要用 Ctrl+C**，在 OpenCode 裡它是清空輸入或離開 |
| 命令清單 | Ctrl+P |
| 離開 | `/exit` |

### Session：管理對話

| 指令 | 用途 |
| --- | --- |
| `/new` | 開新的對話（舊的會保留） |
| `/sessions` | 列出所有對話，選一個切回去 |
| `/compact` | 對話太長時壓成摘要再繼續 |
| `/undo`、`/redo` | 撤回最後一步（連同檔案變更）、反悔 |
| `/timeline` | 選一則訊息：Revert（撤回到那一步）、Copy、Fork（從那一步另開對話） |

下次啟動加 `-c`（`opencode -c`）會接續上一次的對話。OpenCode 的快照只用來回退，不會幫你 commit；要留正式版本，還是要自己 `git commit`。

---

## 5. 三種擴充

| | Skill | Command | Agent |
| --- | --- | --- | --- |
| 一句話 | 教 AI 一套做法 | 把常打的 Prompt 存成 `/指令` | 一個專職角色，有自己的權限 |
| 誰觸發 | AI 判斷需要時自動載入 | 你輸入 `/名稱` | 你輸入 `@名稱`，或由 Build 自動交辦 |
| 放哪裡 | `.agents/skills/名稱/SKILL.md` | `.opencode/commands/名稱.md` | `.opencode/agents/名稱.md` |

三種都只是 Markdown 檔：上面是 `---` 包起來的設定（YAML），下面是給 AI 的文字。新增或修改後沒有生效，`/exit` 後重新啟動 OpenCode。

> **AGENTS.md 和 Skill 怎麼分？** 執行 `/init`，AI 會分析專案產生 `AGENTS.md`，它**每次對話都會讀**，適合放一定要遵守的規則（例如「用 uv run 執行 Python」）；Skill 是**需要時才載入**，適合放特定任務的做法。

## 6. Skill：教 AI 怎麼檢查作業

建立 `.agents/skills/hw-checklist/SKILL.md`：

```markdown
---
name: hw-checklist
description: 檢查 Python 作業是否符合繳交規範，使用者要求檢查作業時使用
---
逐項檢查，用表格回報結果：
1. 每個函式都有 docstring
2. 變數名稱有意義，不用 a、b、tmp
3. 會處理錯誤輸入（例如分數超出 0–100）
4. 至少附一個測試
```

- `name`：必須和資料夾同名，只能用小寫英文、數字和 `-`。
- `description`：最重要。AI 看這句決定要不要載入，要寫清楚「做什麼、什麼時候用」。

> 為什麼放 `.agents/skills/` 而不是 `.opencode/skills/`？兩個位置 OpenCode 都會讀；`.agents/skills/` 是跨工具的位置，Antigravity 等其他 AI 工具也讀得到，跟著專案進 Git 就能共用。

試試看：重新啟動 OpenCode 後輸入 `幫我看 grade.py 符不符合繳交規範`。AI 沒有用到這個 Skill 時，在 Prompt 裡直接點名：`請用 hw-checklist skill 檢查 grade.py`。

## 7. Command：把常打的 Prompt 存成指令

發現自己一直打同一段 Prompt，就把它存成 Command。

建立 `.opencode/commands/commit.md`，檔名就是指令名稱：

```markdown
---
description: 依目前的變更寫 commit 訊息
---
這次的變更如下：
!`git status`
!`git diff`
!`git diff --cached`
用繁體中文寫一則 commit 訊息，
第一行不超過 50 字。只寫訊息，不要 commit。
```

輸入 `/commit` 試試看。

- `` !`指令` ``：送出前先執行這個指令，把輸出放進 Prompt。不用自己複製貼上 `git diff`。
- 這個 Command 沒有指定由誰執行，所以由**你目前的 Agent**（例如 Build）執行。

> **只想省打字、自動帶入資訊，寫 Command 就夠了，不需要建 Agent。**
>
> Command 還可以這樣寫：`$ARGUMENTS` 換成指令後面的文字；`$1`、`$2` 依空格取單一參數；`@檔案` 放入檔案內容。

## 8. 先做個實驗：提示詞擋不住 AI

在 Build 輸入：

```text
@grade.py 用 hw-checklist 檢查這支程式，只要列出問題就好，不要改
```

觀察 AI 有沒有動到 `grade.py`（看對話裡有沒有編輯檔案的紀錄，或執行 `!git status`）。

AI 多半會照做，但**不保證**：模型有時會「順手」把錯誤修好。[階段七](../07-hpc-demo/README.md) 的 AI 也曾自行修改程式。「不要改」寫在提示詞裡，只是**請求**；Build 本來就有改檔的權限，它要改，系統不會擋。

> AI 真的改了，用 `/undo` 還原。

要讓 AI **不能**改檔，得用權限設定，也就是下一步的 Agent。

## 9. Agent：不能改檔的助教 ta

建立 `.opencode/agents/ta.md`，檔名就是 Agent 名稱：

```markdown
---
description: 課程助教，依繳交規範檢查 Python 作業並給回饋；不修改檔案
mode: subagent
temperature: 0.1
permission:
  edit: deny
  bash:
    "*": ask
    "uv run pytest*": allow
---
你是程式設計課的助教，對象是初學者。

## 工作步驟
1. 讀取指定的檔案；沒有指定就先詢問。
2. 用 hw-checklist skill 逐項檢查。
3. 有測試檔時執行 uv run pytest。

## 回報格式
用表格列出：項目、結果、行號、修改建議。
最後先肯定一個做得好的地方。

## 規則
- 不修改任何檔案，也不直接給出完整解答。
- 每個問題都說明原因，用繁體中文回答。
```

> YAML 靠縮排表示層級：`permission` 底下的設定要縮兩格，`bash` 底下再縮兩格。縮排錯了，OpenCode 會報錯。

### 設定拆解

| 欄位 | 意思 |
| --- | --- |
| `description` | 必填。Build 靠這句判斷什麼時候把工作交給 ta |
| `mode: subagent` | 子 Agent：用 `@ta` 呼叫，或由 Build 自動交辦；按 Tab 切不到它 |
| `temperature: 0.1` | 越低回答越穩定，檢查類工作適合設低 |
| `edit: deny` | **ta 不能用編輯工具新增或修改任何檔案。** 這是系統層級的限制，不是請求 |
| `bash` `"*": ask` | 執行任何指令前都先問你 |
| `bash` `"uv run pytest*": allow` | 跑測試不用問 |

權限有三種值：`allow` 直接執行、`ask` 跳出視窗讓你選（允許一次、一律允許或拒絕）、`deny` 禁止。多條規則都符合時，**最後一條生效**，所以範圍最大的 `"*"` 寫在最前面。

> `edit: deny` 擋的是編輯工具。AI 還是可能想用終端機指令改檔，所以 `bash` 設成 `ask`：遇到不是跑測試的指令，你會看到詢問視窗，按**拒絕（Reject）**就好。跑 pytest 會產生快取檔，所以這組設定是「不會直接改作業」，不是完全唯讀。

### 驗證：ta 真的改不了

重新啟動 OpenCode，輸入：

```text
@ta 幫我把 grade.py 的錯誤直接修好
```

ta 應該說明自己不能修改檔案，只給建議。如果它改用終端機指令改檔，會跳出詢問視窗，按拒絕。最後執行 `!git status`，確認 `grade.py` 沒有被改動。

這就是第 8 步和第 9 步的差別：**提示詞是請求，權限是規則。**

## 10. 把 Command 和 Agent 接起來：/check

每次都打 `@ta 用 hw-checklist 檢查…` 也很累，把它存成 Command，並指定交給 ta。建立 `.opencode/commands/check.md`：

```markdown
---
description: 依繳交規範檢查作業檔（交給助教 ta，不會改檔）
agent: ta
---
請用 hw-checklist skill 檢查 $ARGUMENTS，
列出不符合的項目和修改建議。
```

輸入 `/check grade.py`，`$ARGUMENTS` 會換成 `grade.py`。

`agent: ta` 決定這個指令**由誰執行**。ta 是 subagent，所以 ta 會在另一個對話裡檢查完，再把結果交回來；你仍然停在 Build，看完報告可以直接說「照第 2 點修改」，由 Build 動手。

> **為什麼不把 ta 設成 `mode: primary`，按 Tab 切過去用？** 可以，但檢查完要記得切回 Build。忘了切回來，接著說「幫我修好」，ta 會因為不能改檔而拒絕，還得回頭找原因。交給 Command 指定執行者，就不用切來切去。

### 三個檔案的分工

| 檔案 | 決定什麼 |
| --- | --- |
| `hw-checklist/SKILL.md` | **怎麼檢查**（做法） |
| `ta.md` | **誰來檢查、能做什麼**（角色與權限） |
| `check.md` | **一鍵觸發**（存起來的 Prompt，指定交給 ta） |

---

## 11. 練習

照第 2～10 步做一次，逐項確認：

- [ ] `/commit` 會依 `git diff` 的內容寫出 commit 訊息
- [ ] `/check grade.py` 用表格列出不符合規範的項目
- [ ] 請 `@ta` 修改 `grade.py`，ta 沒有改檔（`!git status` 確認）
- [ ] 跳出指令的詢問視窗時，知道可以按拒絕
- [ ] 說得出第 8 步和第 9 步的差別

**進階挑戰（選做）：** 見 [reference.md](reference.md)：建立會出題的 `/quiz`、按 Tab 使用的家教 `tutor`、會補測試的 `tester`。

## 12. 常見問題

| 狀況 | 處理 |
| --- | --- |
| 新增的 Skill、Command、Agent 沒有出現 | 確認放的資料夾和檔名，`/exit` 後重新啟動 |
| 啟動時說 YAML 有錯 | 檢查 `---` 之間的縮排，`permission` 底下要縮兩格 |
| AI 沒有用 hw-checklist | 在 Prompt 裡直接點名 Skill 的名稱；檢查 `name` 和資料夾名稱是否相同 |
| `/undo` 沒有還原檔案 | 啟動 OpenCode 之後才 `git init`；`/exit` 後重新啟動 |
| `opencode --version` 顯示 2.x | 見 [reference.md](reference.md#8-如果你裝的是-opencode-2) |
