# awesome-stars

A curated static site of 1,476 open-source repositories, organized by category. Repos can come from anywhere (GitHub, GitLab, SourceForge…); most started as GitHub stars.

**28M+ total stars · 59 languages · 8 categories · 38 subcategories**

Built with Astro + Tailwind. `data/classified_final.json` is the single source of truth — the site reads it directly at build time, no generation step.

---

## The Collection

| Category | Repos | What's in it |
|----------|-------|--------------|
| AI, LLMs & Data | 354 | Agents, agent skills, LLMs, speech AI, ML, data engineering, science & algorithms |
| Infrastructure & Systems | 272 | Databases, DevOps, networking, OS & runtimes, security |
| Web Development | 219 | Frontend frameworks, UI components, React ecosystem, backend, CMS |
| Standalone Tools & Apps | 204 | Developer tools, terminals, writing & notes, user apps, multimedia, games |
| Libraries & Utilities | 142 | Core utilities, documents & data formats, media, CLI & logging, scraping |
| Knowledge & Inspiration | 117 | Awesome lists, guides, design, history |
| Languages & Engineering | 87 | Compilers & tooling, electronics & IoT |
| Graphics & Visualization | 81 | Charts & diagrams, 2D, 3D & GPU, maps |

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
| `npm run start` | Sync GitHub stars → merges into `classified_final.json` |
| `npm run md` | Regenerate `classification_final.md` from the JSON |

---

## Syncing Stars

```bash
cp .env.example .env   # add GITHUB_TOKEN and GITHUB_USERNAME
npm run start
```

New stars are appended with an empty category and listed in the terminal. Classify them by editing `data/classified_final.json` (see below).

The sync is only a convenience for GitHub stars. The collection isn't tied to GitHub: any repo can be added by hand (see below), and the sync never removes or overwrites entries that aren't among your stars.

---

## Contributing: Categories

The categories are defined in **[`data/taxonomy.json`](data/taxonomy.json)**. Each subcategory has:

- `covers`: what belongs in it
- `not_for`: what looks similar but belongs elsewhere, and where it goes instead
- `examples`: typical repos

**Adding a repo by hand:** append an entry to `data/classified_final.json` with `name`, `owner`, `url`, `description`, `language`, `stars`, `topics`, `updatedAt`, `category` and `subcategory`. It can be hosted anywhere. Use `id: null` for repos that aren't on GitHub, and the host's star count (or `0` if it has none).

**Classifying a repo:** set `category` and `subcategory` in `data/classified_final.json` to a pair from the taxonomy. Go by the repo's main purpose, not its language, and check the *Not for* rules of the groups you're choosing between. When two groups seem to fit, pick the more specific one.

**Changing the taxonomy:** edit `data/taxonomy.json`, keeping `not_for` pointing at the group that should get the excluded repos. If you add a new top-level category, also add it to `COLOR_MAP` in `src/lib/repos.ts`.

---

## Environment Variables

```
GITHUB_TOKEN=      # GitHub personal access token (public_repo scope)
GITHUB_USERNAME=   # Your GitHub username
```

## License

ISC
