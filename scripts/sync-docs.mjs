// 由各階段的 Markdown 產生 docs/guide/*.md，讓每份文件只有一個來源。
// 由 `npm run docs:dev|docs:build` 自動執行；產生的檔案不進 git。
//
// 連結改寫規則：
//   指向 SOURCES 中的檔案（或資料夾的 README.md） -> ./頁面代號
//   指向 repo 內其他檔案或資料夾                     -> GitHub 上的 blob／tree 網址
//   外部網址與頁內錨點                               -> 不變
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, posix } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const REPO = 'https://github.com/gemini960114/ai-agent-course-kit'

const SOURCES = {
  'README.md': '00_course_overview',
  '01-install/README.md': '01_install',
  '01-install/00-antigravity.md': '01_antigravity',
  '01-install/01-layout.md': '01_layout',
  '01-install/windows.md': '01_windows',
  '01-install/macos.md': '01_macos',
  '02-organize-data/README.md': '02_organize_data',
  '03-hello-github/README.md': '03_hello_github',
  '04-web-game/README.md': '04_web_game',
  '05-review-loop/README.md': '05_review_loop',
  '05-review-loop/REVIEW-LOOP.md': '05_review_loop_process',
  '05-review-loop/example/README.md': '05_example',
  '05-review-loop/exercise/ASSIGNMENT.md': '05_assignment',
  '06-agent-skills/README.md': '06_agent_skills',
  '06-agent-skills/tutorial.md': '06_tutorial',
  '07-hpc-demo/README.md': '07_hpc_demo',
  '08-opencode/README.md': '08_opencode',
  '08-opencode/tutorial.md': '08_tutorial',
  '08-opencode/reference.md': '08_reference',
  'AGENTS.md': 'agents_md',
  'teacher/README.md': 'teacher_guide',
  'teacher/05-course-plan.md': 'teacher_05_course_plan',
  'teacher/07-demo-script.md': 'teacher_07_demo_script',
}

// 用 frontmatter 指定「上一頁／下一頁」：
// 側欄中指向同一頁錨點的項目（階段一的第 2、3 步）不會出現在上一頁／下一頁，這裡補上，讓學生依步驟順序前進
const STEP2 = { text: '第 2 步：取得教材', link: '/guide/01_install#第-2-步取得教材' }
const STEP3 = { text: '第 3 步：安裝軟體', link: '/guide/01_install#第-3-步安裝軟體' }
const STEP4 = { text: '第 4 步：版面與 AI 擴充功能', link: '/guide/01_layout' }
const PAGER = {
  '01-install/00-antigravity.md': { next: STEP2 },
  '01-install/windows.md': { prev: STEP3, next: STEP4 },
  '01-install/macos.md': { prev: STEP3, next: STEP4 },
  '01-install/01-layout.md': { prev: STEP3 },
  // 08 延伸閱讀是學生課程的最後一頁，下一頁不要接到教師資料
  '08-opencode/reference.md': { next: false },
}

function frontmatter(source) {
  const pager = PAGER[source]
  if (!pager) return ''
  const lines = Object.entries(pager).map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  return `---\n${lines.join('\n')}\n---\n\n`
}

function resolveTarget(source, target) {
  if (/^(https?:|mailto:|#)/.test(target)) return undefined
  const [path, hash = ''] = target.split('#')
  const anchor = hash ? `#${hash}` : ''
  const resolved = posix.normalize(posix.join(posix.dirname(source), path)).replace(/\/$/, '')

  if (SOURCES[resolved]) return `./${SOURCES[resolved]}${anchor}`
  if (SOURCES[`${resolved}/README.md`]) return `./${SOURCES[`${resolved}/README.md`]}${anchor}`

  const full = join(ROOT, resolved)
  const kind = existsSync(full) && statSync(full).isDirectory() ? 'tree' : 'blob'
  return `${REPO}/${kind}/main/${resolved}${anchor}`
}

function convert(source, markdown) {
  return markdown
    // Markdown 連結 ](目標)
    .replace(/\]\(([^)\s]+)\)/g, (match, target) => {
      const next = resolveTarget(source, target)
      return next === undefined ? match : `](${next})`
    })
    // VitePress 不支援 GitHub 的核取方塊語法，改成符號
    .replace(/^(\s*)- \[ \] /gm, '$1- ☐ ')
    .replace(/^(\s*)- \[x\] /gim, '$1- ☑ ')
}

mkdirSync(join(ROOT, 'docs', 'guide'), { recursive: true })
for (const [source, page] of Object.entries(SOURCES)) {
  const markdown = readFileSync(join(ROOT, source), 'utf8')
  writeFileSync(join(ROOT, 'docs', 'guide', `${page}.md`), frontmatter(source) + convert(source, markdown))
  console.log(`synced docs/guide/${page}.md  <-  ${source}`)
}
