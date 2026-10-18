# OpenCode 延伸閱讀

做完 [tutorial.md](tutorial.md) 的練習後再看。以 OpenCode v1 為準，細節以 [官方文件](https://opencode.ai/docs) 為主。

---

## 1. 接上自己的模型服務

學校或單位有 OpenAI 相容的模型服務時（例如國網中心的 LiteLLM），手動寫設定檔 `~/.config/opencode/opencode.json`（Windows 是 `%USERPROFILE%\.config\opencode\opencode.json`）：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "nchc-litellm/Muse-Glimmer-30B",
  "provider": {
    "nchc-litellm": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "NCHC LiteLLM",
      "options": {
        "baseURL": "https://opencode-litellm.genai.nchc.org.tw/v1",
        "apiKey": "{env:NCHC_API_KEY}"
      },
      "models": {
        "Muse-Glimmer-30B": { "name": "Muse Glimmer 30B" },
        "glm-5-3": { "id": "OpenaiCompatible@GLM-5.3", "name": "GLM 5.3" }
      }
    }
  }
}
```

| 欄位 | 說明 |
| --- | --- |
| `provider` 底下的名稱 | 自訂的供應商名稱；選模型時寫成「名稱/模型」 |
| `options.apiKey` | `{env:…}` 從環境變數讀取，金鑰不要直接寫在檔案裡 |
| `models` | 可用的模型；伺服器上的名稱不同時，用 `id` 對應 |

啟動 OpenCode 之前先設定環境變數：PowerShell 用 `$env:NCHC_API_KEY="sk-…"`，macOS 用 `export NCHC_API_KEY=sk-…`。

常用啟動參數：

| 參數 | 用途 |
| --- | --- |
| `opencode 資料夾` | 在指定的資料夾啟動 |
| `opencode -c` | 接續上一次的對話 |
| `opencode -m 供應商/模型` | 這次用指定的模型 |
| `opencode --agent plan` | 用指定的 Agent 啟動 |
| `opencode run "訊息"` | 不開介面，直接執行一段訊息 |

## 2. 指定模型

大部分時候不需要指定，Command 和 Agent 都會用你在 `/models` 選的模型。需要時，在設定裡加 `model:`：

```markdown
---
description: 依目前的變更寫 commit 訊息
model: 供應商/便宜又快的模型
---
```

- 寫在 **Command**：只有這個指令用這個模型。
- 寫在 **Agent**：這個角色固定用這個模型。

適合特別指定的情況：寫 commit 訊息這類簡單、常做的小事，用便宜又快的模型；需要仔細推理的檢查，用推理能力較強的模型。

## 3. 更多範例

### Command：/quiz 自我測驗

`.opencode/commands/quiz.md`：

```markdown
---
description: 針對檔案出選擇題
---
閱讀 $1，出 $2 題選擇題，
檢查我是否看懂這支程式。
答案和解說統一放在最後。
```

執行 `/quiz grade.py 5`：`$1` 是 `grade.py`，`$2` 是 `5`。

### Agent：家教 tutor（primary）

`.opencode/agents/tutor.md`：

```markdown
---
description: 程式家教，用提問引導學生自己找出答案
mode: primary
permission:
  edit: deny
  bash: deny
---
你是有耐心的程式家教。不要直接給答案，
一次只問一個問題，
引導學生自己想出解法。
```

`mode: primary` 會出現在 Tab 的切換清單裡，切過去後整段對話都由它帶，適合「我想自己找原因」的時候。用完記得按 Tab 切回 Build。

### Agent：測試工程師 tester（subagent，可以改檔）

`.opencode/agents/tester.md`：

```markdown
---
description: 測試工程師，撰寫並執行 pytest 測試
mode: subagent
permission:
  edit: allow
  bash:
    "*": deny
    "uv run pytest*": allow
---
為指定的函式撰寫 pytest 測試，
涵蓋正常值、邊界值和錯誤輸入。
```

和 ta 相反：可以改檔，但指令只能跑 pytest。注意 `edit: allow` 可以改**任何**檔案，「只寫測試」是靠提示詞限定的，不是權限。

### 三個 Agent 比較

| Agent | mode | 編輯工具 | 怎麼叫 | Prompt 範例 |
| --- | --- | --- | --- | --- |
| tutor | primary | 不能 | 按 Tab | 我的平均算錯了，但我想自己找原因 |
| ta | subagent | 不能 | `@ta` | `@ta` 檢查 grade.py 有沒有符合繳交規範 |
| tester | subagent | 可以 | `@tester` | `@tester` 幫 calc_average 補測試並執行 |

設計 Agent 的順序：**負責什麼**（`description`）→ **怎麼叫**（`mode`）→ **能做什麼**（`permission`）。

## 4. mode 的三種值

| mode | 怎麼用 | 例子 |
| --- | --- | --- |
| `primary` | 按 Tab 切換，整段對話由它帶 | 內建的 Build、Plan |
| `subagent` | 用 `@名稱` 呼叫，或由主要 Agent 看 `description` 自動交辦；在另一個對話裡執行，完成後把結果交回 | 內建的 General、Explore |
| `all` | 兩種都可以（沒寫 `mode` 時的預設值） | — |

Command 指定的 `agent:` 是 subagent 時，指令會交給這個 subagent 執行，不會塞滿你目前的對話。

## 5. 權限細節

- **三種值**：`allow` 直接執行；`ask` 跳出視窗，可以選允許一次（once）、這次對話一律允許（always）或拒絕（reject）；`deny` 禁止。
- **最後一條生效**：多條規則都符合時，最後一條生效。範圍最大的 `"*"` 寫在最前面，例外寫在後面。
- **`.env` 預設就不能讀**：OpenCode 預設禁止讀取 `.env`、`.env.*`（`.env.example` 除外），不用自己設定。
- **自動核准模式也擋不住 `deny`**：用 `--auto` 自動核准時，會略過 `ask` 的詢問，但 `deny` 仍然有效。
- **權限可以寫在全域**：寫在 `opencode.json` 的 `permission` 會套用到所有 Agent；寫在個別 Agent 的設定會覆蓋全域。

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "bash": {
      "*": "ask",
      "git status*": "allow",
      "rm *": "deny"
    }
  }
}
```

- **限制可以呼叫哪些 subagent**：權限的 `task` 控制一個 Agent 能把工作交給哪些 subagent。例如不讓 Plan 呼叫 `tester`：

```json
{
  "agent": {
    "plan": {
      "permission": {
        "task": { "tester": "deny" }
      }
    }
  }
}
```

  你自己用 `@tester` 呼叫不受這個限制。

## 6. Skill 和 subagent 差在哪？

兩個都能「讓 AI 照一套方法做事」，差別在**在哪裡做**：

| | Skill | Subagent |
| --- | --- | --- |
| 是什麼 | 一份做法說明 | 一個角色 |
| 在哪裡執行 | 載入**目前的對話**，由目前的 Agent 照著做 | 在**另一個對話**裡做完，只把結果交回來 |
| 自己的權限 | 沒有，跟著目前的 Agent | 有，例如 `edit: deny` |
| 自己的模型 | 沒有 | 可以指定 |

兩者可以一起用：ta 是 subagent，負責「誰來做、能做什麼」；它照 hw-checklist 這個 Skill 檢查，Skill 負責「怎麼做」。

**多個 subagent：** 進一步可以建立好幾個專職的審查 subagent，例如一個檢查正確性、一個檢查是否符合規範，各自指定不同供應商的模型，再由一個 subagent 統整報告。這等於把 [階段五](../05-review-loop/README.md) 的交叉審查寫成設定檔。但審查 AI 一樣可能很有自信地說錯，統整報告還是要自己逐條判斷。

## 7. 要用哪一種？

| 你想要的 | 用 |
| --- | --- |
| 每次對話都要遵守的規則 | `AGENTS.md` |
| 教 AI 某類任務的做法 | Skill |
| 不想一直打同一段 Prompt、想自動帶入 `git diff` 等資訊 | Command |
| AI **不能**做某些事（例如改檔） | Agent + `permission` |
| 一個要長時間對話的角色 | Agent（`mode: primary`） |
| 交辦一件事，做完把結果交回來 | Agent（`mode: subagent`） |

大部分時候，用內建的 Build 搭配幾個 Command 就夠了；遇到需要權限限制時，再建 Agent。

## 8. 如果你裝的是 OpenCode 2

OpenCode 2 是新的主要版本，用 `opencode upgrade --major` 或 Homebrew 的 `brew install opencode` 會裝到它。依官方的 [從 v1 遷移](https://opencode.ai/v2/docs/migrate-v1/) 說明：

- 本教材的 Skill、Command、Agent 檔案放的位置不變，v1 的設定**預期可以繼續使用**。
- 權限的寫法改了：v2 改成一個有順序的 `permissions` 清單，`bash` 改名為 `shell`。v2 會自動轉換 v1 的寫法。
- v1 存取專案以外的資料夾前會先詢問，v2 預設允許。

本教材以 v1 測試。使用 v2 時，做完第 9 步務必確認 ta 真的不能改檔。

## 9. 參考資料

- OpenCode 官方文件：[Agents](https://opencode.ai/docs/agents/)、[Commands](https://opencode.ai/docs/commands/)、[Skills](https://opencode.ai/docs/skills/)、[Permissions](https://opencode.ai/docs/permissions/)
- 教學流程參考：AurenTech〈OpenCode 入門實戰〉YouTube 影片
