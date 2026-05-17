# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install --legacy-peer-deps   # always use this flag — peer dep conflict between astro@6 and @astrojs/tailwind@6
npm run dev                      # dev server at http://localhost:4321
npm run build                    # build static site → dist/
npm run start                    # sync GitHub stars → updates data/classified_final.json
npm run md                       # regenerate data/classification_final.md from the JSON
```

There are no tests.

## Architecture

**Single source of truth:** `data/classified_final.json` — a flat array of repo objects. The site reads it entirely at build time; there is no database or API at runtime. Classification (assigning `category` and `subcategory` to each repo) is done manually by editing this file. Repos with an empty `category` are filtered out by `allRepos` in `src/lib/repos.ts` and never appear on the site.

**Data layer (`src/lib/repos.ts`):** All pages import from here. `allRepos` is the filtered flat list. `getCategories()` builds a nested `Map<slug, CategoryData>` (each containing `subcategories: Map<slug, SubcategoryData>`), sorted by stars. `categoryColor(name)` maps the 7 hardcoded category names to Tailwind color sets — adding a new category requires adding it to `COLOR_MAP` here. `slugify()` is the canonical slug function used for all URL segments.

**Routing:** Two dynamic page templates:
- `src/pages/[category].astro` → `/{categorySlug}/`
- `src/pages/[category]/[subcategory].astro` → `/{categorySlug}/{subcategorySlug}/`

Both call `getStaticPaths()` which drives Astro's static generation from `getCategories()`.

**Base path:** The site is deployed to GitHub Pages at `/awesome-stars/`. The `base` in `astro.config.mjs` is set to `/awesome-stars/`. Every internal link must use `href()` from `src/lib/url.ts` — plain `href="/"` will break in production.

**Passing server data to client scripts:** Astro's `define:vars` does not support ES module `import` inside the same script block. When a client script needs both build-time data and a library import (e.g. `Search.astro` with Fuse.js), serialize the data as `<script type="application/json" id="...">` with `set:html={JSON.stringify(data)}` and read it with `document.getElementById(...).textContent` inside a normal `<script>` tag that can use `import`.

**Client script utilities:** Client `<script>` blocks cannot import from `src/lib/repos.ts` or any server-side module. Utilities like `formatStars` and `slugify` must be inlined/duplicated when needed in client scripts. Any client script that builds HTML via `innerHTML` must escape user-controlled strings — inline an `escapeHtml` helper (replace `&`, `<`, `>`, `"`) rather than relying on framework sanitization, since Astro does not sanitize innerHTML assignments.

**Star sync (`src/github/`):** `npm run start` fetches all starred repos via the GitHub API, merges them into `classified_final.json` by id then name, and prints any new repos that need manual classification. Requires `GITHUB_TOKEN` and `GITHUB_USERNAME` in `.env`.

**Deployment:** Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which runs `npm install --legacy-peer-deps && npm run build` and deploys `dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`.
