// Refreshes the generated regions of README.md from the GitHub API.
//
// The curated table of merged PRs stays hand-written — only the facts that go
// stale are regenerated: the merged count, the list of merged PRs not yet
// placed in that table, and the open-PR summary. Move a PR into the table by
// hand and the next run drops it from the "Also merged" line automatically.

import { readFileSync, writeFileSync } from 'node:fs'

const USER = 'ValentinYoushkevich'
const CORE = 'vuejs/core'
const README = 'README.md'
// Only upstream projects of this size are worth naming outside vuejs/core.
const MIN_STARS = 1000

const token = process.env.GITHUB_TOKEN
if (!token) throw new Error('GITHUB_TOKEN is not set')

async function api(path) {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'user-agent': USER,
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${path}\n${await res.text()}`)
  return res.json()
}

async function search(query) {
  const items = []
  for (let page = 1; page <= 10; page++) {
    const q = encodeURIComponent(query)
    const body = await api(`search/issues?q=${q}&per_page=100&page=${page}`)
    items.push(...body.items)
    if (items.length >= body.total_count || body.items.length === 0) break
  }
  return items
}

const repoOf = item =>
  item.repository_url.replace('https://api.github.com/repos/', '')

const starCache = new Map()
async function stars(repo) {
  if (!starCache.has(repo)) {
    starCache.set(repo, (await api(`repos/${repo}`)).stargazers_count)
  }
  return starCache.get(repo)
}

const label = repo => (repo === CORE ? CORE : repo.split('/')[1])
const prLink = (repo, n, text) =>
  `[${text}](https://github.com/${repo}/pull/${n})`
const listUrl = (repo, state) =>
  `https://github.com/${repo}/pulls?q=` +
  encodeURIComponent(`is:pr author:${USER} is:${state}`).replace(/%20/g, '+')

const WORDS = [
  'no', 'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten',
]
const word = n => WORDS[n] ?? String(n)

function join(parts) {
  if (parts.length <= 1) return parts.join('')
  return `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}`
}

function region(src, name, body) {
  const re = new RegExp(`(<!--m:${name}-->)[\\s\\S]*?(<!--/m:${name}-->)`)
  if (!re.test(src)) throw new Error(`marker m:${name} missing from ${README}`)
  return src.replace(re, `$1${body}$2`)
}

const mergedCore = await search(`type:pr author:${USER} is:merged repo:${CORE}`)
const mergedAll = await search(`type:pr author:${USER} is:merged`)
const open = await search(`type:pr author:${USER} is:open`)

let readme = readFileSync(README, 'utf8')

// --- merged count -----------------------------------------------------------
readme = region(readme, 'count', String(mergedCore.length))

// --- merged PRs not yet placed in the curated table -------------------------
const curated = readme.replace(
  /<!--m:unlisted-->[\s\S]*?<!--\/m:unlisted-->/,
  '',
)
const placed = new Set(
  [...curated.matchAll(/vuejs\/core\/pull\/(\d+)/g)].map(m => Number(m[1])),
)

const unlisted = mergedCore
  .filter(i => !placed.has(i.number))
  .map(i => i.number)
  .sort((a, b) => b - a)

const upstream = []
for (const item of mergedAll) {
  const repo = repoOf(item)
  if (repo === CORE || repo.startsWith(`${USER}/`)) continue
  if ((await stars(repo)) < MIN_STARS) continue
  upstream.push(`${prLink(repo, item.number, `${label(repo)}#${item.number}`)}`)
}

const sentences = []
if (unlisted.length) {
  const links = unlisted.map(n => prLink(CORE, n, `#${n}`)).join(', ')
  sentences.push(`Also merged: ${links} in \`${CORE}\``)
}
if (upstream.length) {
  const lead = sentences.length ? ', plus ' : 'Also merged: '
  sentences.push(`${lead}${join(upstream)}`)
}
readme = region(
  readme,
  'unlisted',
  sentences.length ? `\n<sub>${sentences.join('')}.</sub>\n` : '\n',
)

// --- open pull requests -----------------------------------------------------
const byRepo = new Map()
for (const item of open) {
  const repo = repoOf(item)
  if (repo.startsWith(`${USER}/`)) continue
  if (!byRepo.has(repo)) byRepo.set(repo, [])
  byRepo.get(repo).push(item)
}

const ranked = [...byRepo.entries()].sort(
  (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
)
const links = ranked.map(
  ([repo, items]) => `[${label(repo)}](${listUrl(repo, 'open')}) (${items.length})`,
)
const listText =
  links.length > 1
    ? `${links.slice(0, -1).join(',\n')} and\n${links.at(-1)}`
    : links.join('')

// New lint rules are titled `feat: add \`vue/some-rule\` rule` — options on an
// existing rule are not rules, and must not be counted as such.
const newRules = (byRepo.get('vuejs/eslint-plugin-vue') ?? []).filter(i =>
  /add\s+`[\w/-]+`\s+rule/i.test(i.title),
).length

let inReview = ''
if (ranked.length) {
  const noun = newRules === 1 ? 'rule' : 'rules'
  const tail = newRules
    ? `,\nincluding ${word(newRules)} new \`eslint-plugin-vue\` ${noun}.`
    : '.'
  inReview = `\n**In review** — open pull requests in\n${listText}${tail}\n`
}
readme = region(readme, 'inreview', inReview)

writeFileSync(README, readme)

console.log(`merged in ${CORE}: ${mergedCore.length}`)
console.log(`unlisted: ${unlisted.length ? unlisted.join(', ') : 'none'}`)
console.log(`upstream merged: ${upstream.length}`)
console.log(`open: ${open.length} across ${ranked.length} repos, ${newRules} new rules`)
