# awesome-stars

A curated static site of 1,441 open-source repositories, organized by category. Repos can come from anywhere (GitHub, GitLab, SourceForge…); most started as GitHub stars. This repo is now the stars list itself: repos are added and removed here.

**29M+ total stars · 60 languages · 8 categories · 38 subcategories**

Built with Astro + Tailwind. `data/classified_final.json` is the single source of truth — the site reads it directly at build time, no generation step.

---

## The Collection

| Category | Repos | What's in it |
|----------|-------|--------------|
| AI, LLMs & Data | 333 | Agents, agent skills, LLMs, speech AI, ML, data engineering, science & algorithms |
| Infrastructure & Systems | 266 | Databases, DevOps, networking, OS & runtimes, security |
| Web Development | 213 | Frontend frameworks, UI components, React ecosystem, backend, CMS |
| Standalone Tools & Apps | 221 | Developer tools, terminals, writing & notes, user apps, multimedia, games |
| Libraries & Utilities | 127 | Core utilities, documents & data formats, media, CLI & logging, scraping |
| Knowledge & Inspiration | 117 | Awesome lists, guides, design, history |
| Languages & Engineering | 86 | Compilers & tooling, electronics & IoT |
| Graphics & Visualization | 78 | Charts & diagrams, 2D, 3D & GPU, maps |

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

Being listed means a repo is still worth finding: useful today, or worth keeping as history or reference. These rules decide what leaves.

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
| It's tiny, niche **and** stale, such as a small utility or old experiment | `ascii-table`, `littlebrain` |
| It was part of a hype wave that didn't last, or an early LLM-era project that went quiet | `JARVIS`, `dalai`, `gpt4all` |
| It shipped malicious code, or the link is dead and the project isn't worth chasing | `gpt-pilot`, `Blank-Grabber` |

Nothing is removed automatically: propose removals for review first. To restore a repo, move it back and drop its `archive` field.

### Keeping

- **Quiet repos.** Age alone is never a reason. Finished libraries are done, not dead.
- **Slowing repos.** A drop in commit activity is too weak a signal on its own.
- **Historical and reference projects**, even when archived or unmaintained: `atom`, `reddit`, `bert`, `DALL-E`, `llama`, `DeepSpeech`, `neofetch`, `mozilla/TTS`, `ml5`, `face-api.js`, `node-opencv`, `opencv4nodejs`, `three-rs/three`.
- **Markers of a period**, even from a hype wave: `babyagi`, `gpt-engineer`.
- **Small but not irrelevant.** Few stars aren't enough: maintained small libraries such as `valid-filename` or `url-join` stay.
- **Still the practical choice**, even with a partial native alternative: `nodemon`, `dotenv`.
- **Too early to judge.** The "claw" agent variants and `AutoGPT` stay.
- **Personal picks.** The owner's call beats every rule above: `TinyJS`, `TinyAnimate`, `js13k-2021`, `AllAlgorithms/brainfuck`, `jailbreaking-experiments`, `continue`, `chatterbox`.

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

---

## Environment Variables

Only needed for the sync.

```
GITHUB_TOKEN=      # GitHub personal access token (public_repo scope)
GITHUB_USERNAME=   # Your GitHub username
```

## License

ISC
