<img src="https://raw.githubusercontent.com/ValentinYoushkevich/ValentinYoushkevich/main/assets/banner.svg?v=2" width="100%" alt="Valentin Youshkevich — full-stack developer and AI integrator, TypeScript"/>

### Hi, I'm Valentin 👋

Full-stack developer and **AI integrator**, working mostly in **TypeScript** — Node.js services and
APIs on the back end, Vue 3 on the front, and LLM pipelines wired into products rather than bolted
on afterwards: embeddings and deduplication, classification, rewriting and translation, with the
orchestration and the guardrails around them.

My open-source time goes somewhere much narrower: **Vapor mode** in `vuejs/core` — finding the
places where a Vapor component and its VDOM equivalent disagree, and closing the gap.

```yaml
name: "Valentin Youshkevich"
handle: ValentinYoushkevich
focus:
  - "Full-stack TypeScript — Node.js, Fastify, Express, Prisma / PostgreSQL"
  - "Vue 3 · Vite · Tailwind on the client"
  - "AI integrations — LLM pipelines, embeddings, local and hosted models"
open_source: "Vue ecosystem — core (Vapor mode), eslint-plugin-vue, vueuse, vite, element-plus"
house_rules:
  - "A failing test before the fix, always"
  - "Smallest sufficient change — no drive-by cleanup"
  - "If it claims a perf win, it ships with numbers"
```

---

### 🔬 How I find these bugs

Vapor mode is meant to be behaviourally identical to the VDOM renderer. I run the same component
tree through both renderers and diff the result — DOM shape, prop values, hook order, hydration
mismatches. Where the two disagree, one of them is wrong, and that disagreement becomes a failing
test before it becomes a patch.

---

### 🟢 Open source

**Merged** — <!--m:count-->42<!--/m:count--> pull requests in [`vuejs/core`](https://github.com/vuejs/core/pulls?q=is%3Apr+author%3AValentinYoushkevich+is%3Amerged), all in Vapor mode:

| Area | What I fixed | PRs |
|---|---|---|
| `runtime-vapor` — KeepAlive | A cached VDOM child kept stale props; a component reactivated in a nested branch never unmounted; an `include`/`exclude` change dropped the current branch | [#15560](https://github.com/vuejs/core/pull/15560), [#15526](https://github.com/vuejs/core/pull/15526), [#15525](https://github.com/vuejs/core/pull/15525) |
| `runtime-vapor` — hydration | Multi-root async components desynced the walk; empty text blocks were hydrated out of place; a `null` value binding crashed | [#15532](https://github.com/vuejs/core/pull/15532), [#15534](https://github.com/vuejs/core/pull/15534), [#15541](https://github.com/vuejs/core/pull/15541) |
| `runtime-vapor` — VDOM interop | Nested VDOM content was not unmounted; a VDOM child rooted at a slot outlet resolved to the wrong nodes; slots never reached VDOM async components | [#15524](https://github.com/vuejs/core/pull/15524), [#15542](https://github.com/vuejs/core/pull/15542), [#15513](https://github.com/vuejs/core/pull/15513) |
| `runtime-vapor` — rendering | `v-for` item order broke around empty nested branches; transition classes were wiped by a class update; deferred teleport children fired update hooks on mount | [#15529](https://github.com/vuejs/core/pull/15529), [#15528](https://github.com/vuejs/core/pull/15528), [#15527](https://github.com/vuejs/core/pull/15527) |
| `compiler-vapor` — expressions | Repeated expressions were replaced by text match instead of AST range; optional-chain prefixes and member expressions with unsupported keys were cached unsafely | [#15538](https://github.com/vuejs/core/pull/15538), [#15530](https://github.com/vuejs/core/pull/15530), [#15540](https://github.com/vuejs/core/pull/15540) |
| `compiler-vapor` — output parity | Raw values lost on `v-model`; number literals lost on slot outlet props; the leading newline of `<pre>` / `<textarea>` dropped; `key` wrongly honoured on `<template>` branches; static attribute values and comments decoded twice | [#15553](https://github.com/vuejs/core/pull/15553), [#15539](https://github.com/vuejs/core/pull/15539), [#15543](https://github.com/vuejs/core/pull/15543), [#15514](https://github.com/vuejs/core/pull/15514), [#15509](https://github.com/vuejs/core/pull/15509), [#15563](https://github.com/vuejs/core/pull/15563) |

<!--m:unlisted-->
<sub>Also merged: [#15636](https://github.com/vuejs/core/pull/15636), [#15631](https://github.com/vuejs/core/pull/15631), [#15624](https://github.com/vuejs/core/pull/15624), [#15623](https://github.com/vuejs/core/pull/15623), [#15620](https://github.com/vuejs/core/pull/15620), [#15606](https://github.com/vuejs/core/pull/15606), [#15601](https://github.com/vuejs/core/pull/15601), [#15594](https://github.com/vuejs/core/pull/15594), [#15588](https://github.com/vuejs/core/pull/15588), [#15587](https://github.com/vuejs/core/pull/15587), [#15583](https://github.com/vuejs/core/pull/15583), [#15575](https://github.com/vuejs/core/pull/15575), [#15574](https://github.com/vuejs/core/pull/15574), [#15552](https://github.com/vuejs/core/pull/15552), [#15550](https://github.com/vuejs/core/pull/15550), [#15522](https://github.com/vuejs/core/pull/15522), [#15520](https://github.com/vuejs/core/pull/15520), [#15511](https://github.com/vuejs/core/pull/15511), [#15510](https://github.com/vuejs/core/pull/15510), [#15506](https://github.com/vuejs/core/pull/15506), [#15497](https://github.com/vuejs/core/pull/15497) in `vuejs/core`, plus [eslint-plugin-vue#3143](https://github.com/vuejs/eslint-plugin-vue/pull/3143), [eslint-plugin-vue#3122](https://github.com/vuejs/eslint-plugin-vue/pull/3122), [typescript-eslint#12697](https://github.com/typescript-eslint/typescript-eslint/pull/12697), [eslint-plugin-vue#3116](https://github.com/vuejs/eslint-plugin-vue/pull/3116), [eslint-plugin-vue#3115](https://github.com/vuejs/eslint-plugin-vue/pull/3115) and [eslint-plugin-vue#3113](https://github.com/vuejs/eslint-plugin-vue/pull/3113).</sub>
<!--/m:unlisted-->

<!--m:inreview-->
**In review** — open pull requests in
[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue/pulls?q=is%3Apr+author%3AValentinYoushkevich+is%3Aopen) (12),
[vuejs/core](https://github.com/vuejs/core/pulls?q=is%3Apr+author%3AValentinYoushkevich+is%3Aopen) (6),
[element-plus](https://github.com/element-plus/element-plus/pulls?q=is%3Apr+author%3AValentinYoushkevich+is%3Aopen) (4),
[vite](https://github.com/vitejs/vite/pulls?q=is%3Apr+author%3AValentinYoushkevich+is%3Aopen) (3) and
[vueuse](https://github.com/vueuse/vueuse/pulls?q=is%3Apr+author%3AValentinYoushkevich+is%3Aopen) (2),
including three new `eslint-plugin-vue` rules.
<!--/m:inreview-->

---

### 🚀 Selected work

| Project | What it is | Stack |
|---|---|---|
| [**clever-vibe**](https://github.com/ValentinYoushkevich/clever-vibe) | Tracks where AI assistants actually help in development: each use is logged in 20–30 seconds against a catalogue of ~41 approaches, scored for usefulness and trust, and rolled up into frequency × usefulness quadrants, stage coverage and per-approach spread — with averages muted below N = 5. | TypeScript · Fastify · Prisma/PostgreSQL · Vue 3 · PrimeVue · Vitest · Docker |
| [**news-poster**](https://github.com/ValentinYoushkevich/news-poster) | News pipeline for Telegram channels: RSS collection, embedding-based deduplication, local bucket classification, LLM rewrite and translation, preview and publishing from a Vue 3 admin panel. | TypeScript · Express · Prisma/PostgreSQL · Vue 3 · Ollama · OpenRouter · n8n · Docker |
| [**palisad**](https://github.com/ValentinYoushkevich/palisad) | Offline-first PWA for plant nurseries: a QR-tagged plant registry, field operations log, movements and printable PDF labels — the whole workflow runs with no connection and reconciles when one returns. | Vue 3 · Dexie/IndexedDB · Workbox · Express 5 · PostgreSQL · Knex · pdfkit |
| [**cleverlog**](https://github.com/ValentinYoushkevich/cleverlog) | Employee time-tracking system — per-project logging, roles, and validation rules, built from a written spec. | JavaScript · Node.js · Vue |
| [**patientDataCollector**](https://github.com/ValentinYoushkevich/patientDataCollector) | Chrome/Edge extension (Manifest V3) that collects patient referral fields straight from EMR pages, lets the missing ones be filled in by hand, attaches saved provider data and posts the result as JSON to a configured endpoint. | JavaScript · Vue · Manifest V3 |

---

### 🧰 Tools I reach for

<p>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Fastify-202020?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify"/>
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama"/>
<img src="https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/Vue.js-41B883?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue.js"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest"/>
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"/>
</p>

---

### 📊 GitHub

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com?user=ValentinYoushkevich&theme=github-dark-blue&hide_border=true&background=00000000">
  <img src="https://streak-stats.demolab.com?user=ValentinYoushkevich&hide_border=true&background=00000000" alt="GitHub streak" height="165"/>
</picture>

<a href="https://github.com/ValentinYoushkevich"><img src="https://ghchart.rshah.org/41b883/ValentinYoushkevich" alt="Contribution graph" width="100%"/></a>

---

<p>
<a href="https://www.linkedin.com/in/valentin-yushkevich/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
<a href="https://github.com/vuejs/core/pulls?q=is%3Apr+author%3AValentinYoushkevich"><img src="https://img.shields.io/badge/My%20PRs%20in%20vuejs%2Fcore-41B883?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Pull requests in vuejs/core"/></a>
</p>
