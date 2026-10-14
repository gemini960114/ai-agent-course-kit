# case09 試跑紀錄（2026-10-14）

老師依 tutorial.md 第 7 節「實作：從混亂文件到會議知識庫」試跑的完整產出，供上課展示與對照。練習時不要讓 agent 讀取這個資料夾。

| 項目 | 來自 | 結果 |
| --- | --- | --- |
| `plan_匿名檔名版.md` | 步驟 1（檔名匿名化時的版本，已不使用） | 25/25 判斷正確 |
| `plan.md` | 步驟 1（原始檔名，當時 25 個檔） | 25/25 判斷正確；有判斷前後不一致、過度保守等小瑕疵 |
| `organized_files/` | 步驟 2＋延伸 B 合併 | 位置全對，複製檔與原檔內容相同 |
| `check.md` | 步驟 3 | 100% |
| `organized_extra/` | 延伸 A（用 meeting-organizer 整理 extra_files） | 21/21 |
| `skills/meeting-organizer/` | 延伸 A 用 skill-creator 製作的 skill | 已從 .claude/skills、.agents/skills 移出 |
| `timeline.md` | 延伸 C（第二次產生） | 逐場決議正確；第 10 行年度總覽把 CC 授權寫成「成功納入」，比原文誇大 |
| `qa.md` | 延伸 C 問答 | 5 題全對 |

注意：試跑時主練習還是 25 個檔，之後才把 `108年度第1次會議_逐字紀錄.docx` 移到 `new_files/`，所以延伸 B 中這個檔被判為重複檔，而不是補齊缺件。

要還原這個 skill 做展示：把 `skills/meeting-organizer/` 複製到 `.claude/skills/` 與 `.agents/skills/`，再重新啟動工作階段。
