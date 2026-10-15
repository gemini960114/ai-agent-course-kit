# 第 1 步：安裝並啟動 Antigravity IDE（手動）

本課程使用 **Antigravity IDE** 當作編輯器和 AI 助手。後面的軟體安裝可以交給 AI 完成，但 AI 編輯器本身要**先手動安裝**。

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

---

完成後，接著做 [第 2 步：取得教材](README.md#第-2-步取得教材)。
