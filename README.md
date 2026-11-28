# awesome-stars

A curated static site of 1,374 open-source repositories, organized by category. Repos can come from anywhere (GitHub, GitLab, SourceForge…); most started as GitHub stars. This repo is now the stars list itself: repos are added and removed here.

**29M+ total stars · 60 languages · 8 categories · 38 subcategories**

Built with Astro + Tailwind. `data/classified_final.json` is the single source of truth — the site reads it directly at build time, no generation step.

---

## The Collection

| Category | Repos | What's in it |
|----------|-------|--------------|
| AI, LLMs & Data | 328 | Agents, agent skills, LLMs, speech AI, ML, data engineering, science & algorithms |
| Infrastructure & Systems | 253 | Databases, DevOps, networking, OS & runtimes, security |
| Web Development | 201 | Frontend frameworks, UI components, React ecosystem, backend, CMS |
| Standalone Tools & Apps | 211 | Developer tools, terminals, writing & notes, user apps, multimedia, games |
| Libraries & Utilities | 119 | Core utilities, documents & data formats, media, CLI & logging, scraping |
| Knowledge & Inspiration | 111 | Awesome lists, guides, design, history |
| Languages & Engineering | 81 | Compilers & tooling, electronics & IoT |
| Graphics & Visualization | 70 | Charts & diagrams, 2D, 3D & GPU, maps |

Full table: [data/classification_final.md](data/classification_final.md)

---

## Quick Start

```bash
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # build static site → dist/
```

---

## Scripts

| Script | What it does |
|--------|-------------|
| `npm run dev` | Start Astro dev server |
| `npm run build` | Build static site |
| `npm run start` | Sync GitHub stars into `classified_final.json` (no longer used) |
| `npm run md` | Regenerate `classification_final.md` from the JSON |

---

## Syncing Stars (no longer used)

The collection started as an import of GitHub stars and is now maintained by hand. The sync still works if it's ever needed:

```bash
cp .env.example .env   # add GITHUB_TOKEN and GITHUB_USERNAME
npm run start
```

It skips repos in the archive (by id or URL), appends new stars with an empty category, and never removes entries that aren't among your stars.

---

## Curation

Being listed means a repo is still worth finding. The deciding question is **what it's listed for**:

- **Something you'd depend on** (a library, tool or service) has to earn its place by being usable today. If it's stale and something else does the job, it goes. Heavy downloads or many stars don't save it.
- **Something interesting in itself** (an idea, technique, experiment, puzzle solution, artwork, toy, joke, hobby OS or piece of history) stays. Age, size and low stars don't matter, because there's nothing to replace.

When a small repo could be either, ask what someone gets from reading it. If there's something to learn or enjoy, keep it. If it's only plumbing, a boilerplate example or one more stale list, it can go. The tables below apply this question.

**No personal repos.** This is a list of other people's work worth finding. Personal projects, such as coursework or games made with friends, aren't added, and any that slip in are deleted outright without an archive record.

### Adding and classifying

The categories are defined in **[`data/taxonomy.json`](data/taxonomy.json)**. Each subcategory has:

- `covers`: what belongs in it
- `not_for`: what looks similar but belongs elsewhere, and where it goes instead
- `examples`: typical repos

**Adding a repo by hand:** append an entry to `data/classified_final.json` with `name`, `owner`, `url`, `description`, `language`, `stars`, `topics`, `updatedAt`, `category` and `subcategory`. It can be hosted anywhere. Use `id: null` for repos that aren't on GitHub, and the host's star count (or `0` if it has none).

**Classifying a repo:** set `category` and `subcategory` in `data/classified_final.json` to a pair from the taxonomy. Go by the repo's main purpose, not its language, and check the *Not for* rules of the groups you're choosing between. When two groups seem to fit, pick the more specific one.

**Changing the taxonomy:** edit `data/taxonomy.json`, keeping `not_for` pointing at the group that should get the excluded repos. If you add a new top-level category, also add it to `COLOR_MAP` in `src/lib/repos.ts`.

### Removing

| When | Examples |
|------|----------|
| It no longer gets updates and is easy to replace. Losing updates counts as deprecated, even if people still run it | `filebrowser`, `react-beautiful-dnd`, `minio` |
| Its README says it's deprecated, unmaintained or retired, or it's archived upstream, and it has no historical or reference value | `cleave.js`, `vaul`, `daytona` |
| The language, runtime or platform now covers most of what a small library did. This applies to bigger libraries too | `bthreads`, `bluebird`, `ts-node` |
| Another tool or approach took its place | `bower`, `next-pwa` |
| It's a tiny, niche **and** stale dependency or plumbing, such as a small utility, plugin, usage example or tutorial repo | `ascii-table`, `terminal-game-io`, `nextjs-chartjs` |
| It was part of a hype wave that didn't last, or an early LLM-era project that went quiet | `JARVIS`, `dalai`, `gpt4all` |
| It shipped malicious code, or the link is dead and the project isn't worth chasing | `gpt-pilot`, `Blank-Grabber` |

Nothing is removed automatically: propose removals for review first. To restore a repo, move it back and drop its `archive` field.

### Keeping

- **Finished libraries.** Age alone is never a reason. A small or settled library that still does its job is done, not dead: `lunr.js`, `d3-sankey`, `mustache.js`, `js-levenshtein`. A quiet dependency with a better-maintained replacement is different (see Removing).
- **Slowing repos.** A drop in commit activity is too weak a signal on its own.
- **Interesting in itself**, however small or old: algorithm and signal-processing experiments (`DeadReckoning`, `HoughRectangle`, `noise_reduction`), puzzle solutions and language exercises (`cheryls-birthday-prolog`, `id3-prolog`), visual and creative code (`hashicon`, `Mosaic-Visual-Hash`, `FlowerJS`, `musicode`), toys and jokes (`favicon-dino-game`, `thanos-js`), hobby systems and niche domains (`IsolatedOS`, `libsathelper`), and classics (`node-elizabot`, `password-store`).
- **Historical and reference projects**, even when archived or unmaintained: `atom`, `reddit`, `bert`, `DALL-E`, `llama`, `DeepSpeech`, `neofetch`, `mozilla/TTS`, `ml5`, `face-api.js`, `node-opencv`, `opencv4nodejs`, `three-rs/three`.
- **Markers of a period**, even from a hype wave: `babyagi`, `gpt-engineer`.
- **Small but not irrelevant.** Few stars aren't enough: maintained small libraries such as `valid-filename` or `url-join` stay.
- **Still the practical choice**, even with a partial native alternative: `nodemon`, `dotenv`.
- **Too early to judge.** The "claw" agent variants and `AutoGPT` stay.
- **Owner's picks.** The owner's call beats every rule above: `TinyJS`, `TinyAnimate`, `js13k-2021`, `AllAlgorithms/brainfuck`, `jailbreaking-experiments`, `continue`, `chatterbox`.

### Archive

Removed repos move from `classified_final.json` to **[`data/archive.json`](data/archive.json)**, so there's a record of why they left and what replaced them. The site never reads it. Each entry is the original repo object plus an `archive` field:

```json
"archive": {
  "date": "2026-11-28",
  "reason": "native-replacement",
  "note": "Node has worker threads built in.",
  "replacedBy": [{ "name": "node:worker_threads" }]
}
```

`replacedBy` can be empty, and an entry in it has a `url` when there's something to link to.

| Reason | Meaning |
|--------|---------|
| `native-replacement` | The language, runtime or platform now covers most of it |
| `superseded` | Another tool or approach took its place |
| `unmaintained` | No longer maintained |
| `faded` | Its moment passed |
| `too-minor` | Too small or niche to list |
| `moved` | The old address of a repo that moved. The project may still be listed under its new one |
| `malware` | Shipped or contained malicious code |
| `unavailable` | The link no longer resolves |

### Moved and renamed repos

An archived repo may only have moved, so check where it went before removing it.

- **Renamed or transferred:** update `owner`, `name` and `url`. Check that the repo id is unchanged.
- **Moved to a new repo or host:** point the entry at the new home and archive the old one as `moved`. Off GitHub, use `id: null` and the host's star count. For a package inside a monorepo, keep its own name and link to its folder (the star count is the monorepo's).
- **Successor already listed:** just archive the old entry.

### Auditing

- Check live data with `gh`. The stored `updatedAt` isn't a maintenance signal; use the archived flag and the last commit date.
- Many dead projects never press Archive, so read the top of the README too.
- Check that a named successor exists and is active, and say when it isn't a drop-in replacement.
- Record what replaced each removed repo whenever there is something.
- npm downloads help show whether a quiet library is still used, but they include indirect installs and can belong to an unrelated package with the same name. They don't outweigh an easy replacement.

---

## Environment Variables

Only needed for the sync.

```
GITHUB_TOKEN=      # GitHub personal access token (public_repo scope)
GITHUB_USERNAME=   # Your GitHub username
```

## License

ISC
