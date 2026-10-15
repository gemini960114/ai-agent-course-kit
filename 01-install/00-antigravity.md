# 第 0 步：安裝 AI 編輯器 Antigravity IDE（手動）

本課程使用 **Antigravity IDE** 當作編輯器和 AI 助手。後面的安裝步驟可以交給 AI 完成，但 AI 編輯器本身要**先手動安裝**。

---

## 1. 下載

> **電腦需求：** Windows 10／11（64 位元），或 macOS 12（Monterey）以上的 **Apple Silicon（M 系列晶片）Mac**。
> 本課程**不支援 Intel Mac**：Antigravity 官方文件寫明不支援 x86 Mac，安裝其他工具用的 Homebrew 也只支援 Apple Silicon。

打開官方下載頁：**https://antigravity.google/download**

> ⚠️ **注意：不要選頁面上方的「Antigravity app」。**
> 請往下捲動，找到 **「Antigravity IDE (Standalone)」** 這一區，再依你的電腦選擇下載。

| 電腦 | 選擇 | 怎麼知道是哪一種 |
| --- | --- | --- |
| **Windows** | 大多數電腦選 **x64**；少數 ARM 筆電選 ARM64 | 「設定 → 系統 → 關於」的「系統類型」：寫「x64」選 x64，寫「ARM」選 ARM64 |
| **macOS** | **Apple Silicon**（M 系列晶片） | 左上角蘋果選單 →「關於這台 Mac」：顯示「晶片 Apple M…」即可；顯示「處理器 Intel」的 Mac 不支援本課程 |

## 2. 安裝

- **Windows**：執行下載的安裝檔，依畫面指示完成。
- **macOS**：打開下載的檔案，把 Antigravity IDE 拖進「應用程式」資料夾。

## 3. 第一次啟動

1. 開啟 Antigravity IDE，依畫面指示用 **Google 帳號登入**。
2. 確認看得到 AI 的對話面板，輸入一句「你好」測試能不能回應。

之後的練習都在 Antigravity IDE 裡進行，常用的兩個操作：

| 操作 | 怎麼做 |
| --- | --- |
| 開啟資料夾 | 選單「檔案 → 開啟資料夾」（File → Open Folder）；或在終端機輸入 `antigravity-ide .`（開啟目前所在的資料夾） |
| 開啟終端機 | 選單「終端機 → 新增終端機」（Terminal → New Terminal） |

> 若終端機找不到 `antigravity-ide` 指令，改用選單「檔案 → 開啟資料夾」（File → Open Folder）即可。

## 4. 調整版面：把 AI 面板放在右側（建議）

左邊看檔案、中間看內容、右邊和 AI 對話，操作起來比較順手。

1. 打開右側欄：選單「檢視 → 外觀」（View → Appearance），勾選 **Secondary Side Bar**。
2. 在同一層選單的 **Secondary Activity Bar Position** 選 **Default**。右側就會出現 Secondary Side Bar，上方有一排圖示可以切換面板。
3. 把終端機也移到右側（建議）：在畫面中下方找到「終端機」（Terminal）分頁，按滑鼠右鍵 → **Move → Secondary Side Bar**。

### 選用：安裝其他 AI agent 擴充功能

本課程的練習都用 Antigravity 內建的 AI 完成，不需要另外安裝。如果你有 ChatGPT 或 Claude 的付費方案，也可以把它們的 AI agent 裝進 Antigravity IDE，例如當作階段五的第二個 AI：

1. 點左側的「擴充功能」（Extensions）圖示，搜尋並安裝：
   - **Codex – OpenAI's coding agent**（發行者 openai），需要 ChatGPT 付費方案
   - **Claude Code for VS Code**（發行者 Anthropic），需要 Claude 付費方案
2. 安裝後，它們的圖示可能出現在左側。在圖示上按滑鼠右鍵 → **Move → Secondary Side Bar**，移到右側和 AI 面板放在一起。

---

完成後，回到 [階段一的安裝說明](README.md)，把安裝 Prompt 貼給 Antigravity 的 AI，安裝模組一～三。
