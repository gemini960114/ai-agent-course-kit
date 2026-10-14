# 安裝本課程使用的 skills（同時安裝給 Antigravity 與 Claude Code）
# 只挑課程用得到的 skill，裝太多會讓觸發變得不精準。順序與 tutorial.md 的章節相同。
# 安裝完成後請重新啟動 agent 工作階段。

# 1. 設計質量
npx skills add anthropics/skills@frontend-design -a antigravity -a claude-code --copy -y

# 2. 視覺設計
npx skills add anthropics/skills@canvas-design -a antigravity -a claude-code --copy -y

# 3. 做視頻
npx skills add remotion-dev/skills@remotion-best-practices -a antigravity -a claude-code --copy -y

# 4. 論文研究
npx skills add NousResearch/hermes-agent@arxiv -a antigravity -a claude-code --copy -y

# 5. 研究論文寫作
npx skills add master-cai/research-paper-writing-skills@research-paper-writing -a antigravity -a claude-code --copy -y

# 6. 需求討論
npx skills add obra/superpowers@brainstorming -a antigravity -a claude-code --copy -y

# 7. 找 skills / 自己做 skill
npx skills add vercel-labs/skills@find-skills -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@skill-creator -a antigravity -a claude-code --copy -y

# 8. 文件處理
npx skills add anthropics/skills@docx -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@pdf -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@pptx -a antigravity -a claude-code --copy -y
npx skills add anthropics/skills@xlsx -a antigravity -a claude-code --copy -y
