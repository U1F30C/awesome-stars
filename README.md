# awesome-stars

A curated static site of 1,350 GitHub starred repositories, organized by category.

**25M+ total stars · 58 languages · 7 categories · 25 subcategories**

Built with Astro + Tailwind. `data/classified_final.json` is the single source of truth — the site reads it directly at build time, no generation step.

---

## The Collection

| Category | Repos | What's in it |
|----------|-------|--------------|
| AI, LLMs & Data | 243 | Models, ML frameworks, data engineering |
| Web Development | 258 | Frontend, backend, CMS |
| Infrastructure & Systems | 212 | Databases, DevOps, security |
| Libraries & Utilities | 276 | JS/TS libraries, general utilities |
| Languages & Engineering | 82 | Compilers, graphics, electronics |
| Standalone Tools & Apps | 181 | IDEs, games, multimedia, user apps |
| Knowledge & Inspiration | 98 | Awesome lists, guides, design |

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

New stars are appended with an empty category and listed in the terminal. Classification is done manually by editing `data/classified_final.json`.

---

## Environment Variables

```
GITHUB_TOKEN=      # GitHub personal access token (public_repo scope)
GITHUB_USERNAME=   # Your GitHub username
```

## License

ISC
