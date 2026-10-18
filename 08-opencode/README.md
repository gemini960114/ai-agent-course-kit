# 階段八（選修）：OpenCode 入門

約 90 分鐘。換一個 AI 工具：在終端機使用開源的 [OpenCode](https://opencode.ai)，用一個小作業專案 `hw-grader`，從安裝一路做到自己的作業助教。

前面的階段都在 Antigravity 裡用 AI；這個階段學的是**把 AI 的工作方式寫成設定檔**：

| 擴充 | 一句話 | 這個階段做的 |
| --- | --- | --- |
| Skill | 教 AI 一套做法 | `hw-checklist`：作業繳交檢查清單 |
| Command | 把常打的 Prompt 存成 `/指令` | `/commit`、`/check` |
| Agent | 一個專職角色，有自己的權限 | 助教 `ta`：只能檢查，**系統不讓它改檔** |

**重點：在提示詞裡說「不要改」，只是請求；要 AI 真的不能改，得靠權限設定。**

> 需要：
> - 模組一已安裝 Git、uv、Node.js。
> - 一個 OpenCode 可以使用的模型。可以先試 OpenCode Zen 標示 Free 的模型；學校或單位有自己的模型服務時，見 [reference.md](reference.md#1-接上自己的模型服務)。
> - 本教材以 **OpenCode v1（1.19.3）** 為準。OpenCode 2 已經推出，但設定方式有差異，見 [reference.md](reference.md#8-如果你裝的是-opencode-2)。

---

**依序閱讀：**

1. [tutorial.md](tutorial.md)：教材，從安裝到做出作業助教，每一步都可以照抄
2. [reference.md](reference.md)：延伸閱讀，做完練習想知道更多時再看（自訂模型、更多 Agent 範例、權限細節）
3. [example/hw-grader/](example/hw-grader)：完成版的設定檔，做完可以對照

> 🎬 **講解影片與簡報**：見 [課程簡報與相關檔案（Google Drive）](https://drive.google.com/drive/folders/1sVEZqsPDyDFIVwplZimbIYweJH68_XOW?usp=sharing)。
