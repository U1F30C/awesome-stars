// Agent-readable views of the catalog. Everything here is derived at build time
// from allRepos (data/classified_final.json) and data/taxonomy.json — no second source of truth.
import taxonomy from '../../data/taxonomy.json';
import { allRepos, getCategories, formatStars, slugify } from './repos';
import type { Repo, CategoryData, SubcategoryData } from './repos';
import { href } from './url';

export const SITE_NAME = 'Awesome Stars';
export const SITE_TAGLINE = 'A curated collection of open-source repositories from any host';

export const catPath = (cat: CategoryData) => href(`/${cat.slug}/`);
export const subPath = (cat: CategoryData, sub: SubcategoryData) => href(`/${cat.slug}/${sub.slug}/`);
export const catMd = (cat: CategoryData) => href(`/${cat.slug}.md`);
export const subMd = (cat: CategoryData, sub: SubcategoryData) => href(`/${cat.slug}/${sub.slug}.md`);

export const absolute = (path: string, site?: URL) => (site ? new URL(path, site).href : path);

export function slimRepo(r: Repo) {
  return {
    name: r.name,
    owner: r.owner,
    url: r.url,
    description: r.description ?? '',
    language: r.language ?? '',
    stars: r.stars,
    topics: r.topics ?? [],
    category: r.category,
    subcategory: r.subcategory,
    categorySlug: slugify(r.category),
    subcategorySlug: slugify(r.subcategory),
  };
}

const oneLine = (s?: string) => (s ?? '').replace(/\s+/g, ' ').trim();

export function repoLine(r: Repo): string {
  const meta = [`★ ${formatStars(r.stars)}`, r.language].filter(Boolean).join(' · ');
  const desc = oneLine(r.description);
  const topics = r.topics?.length ? ` [${r.topics.join(', ')}]` : '';
  return `- [${r.owner}/${r.name}](${r.url}) — ${meta}${desc ? ` — ${desc}` : ''}${topics}`;
}

export function taxonomyEntry(category: string, subcategory: string) {
  return (taxonomy as any[]).find((t) => t.category === category && t.subcategory === subcategory);
}

export function subMarkdown(cat: CategoryData, sub: SubcategoryData): string {
  const t = taxonomyEntry(cat.name, sub.name);
  return [
    `# ${sub.name} — ${cat.name}`,
    '',
    `${sub.repos.length} repositories, sorted by stars. [All categories](${href('/llms.txt')})`,
    ...(t ? ['', `**Covers:** ${t.covers}`, '', `**Not for:** ${t.not_for}`] : []),
    '',
    ...sub.repos.map(repoLine),
    '',
  ].join('\n');
}

export function categoryMarkdown(cat: CategoryData): string {
  const subs = Array.from(cat.subcategories.values());
  return [
    `# ${cat.name}`,
    '',
    `${cat.repos.length} repositories across ${subs.length} subcategories. [All categories](${href('/llms.txt')})`,
    '',
    ...subs.flatMap((sub) => {
      const t = taxonomyEntry(cat.name, sub.name);
      return [
        `## ${sub.name} (${sub.repos.length})`,
        ...(t ? ['', `Covers: ${t.covers}`] : []),
        '',
        ...sub.repos.map(repoLine),
        '',
      ];
    }),
  ].join('\n');
}

export function taxonomyJson() {
  return Array.from(getCategories().values()).map((cat) => ({
    category: cat.name,
    slug: cat.slug,
    count: cat.repos.length,
    path: catPath(cat),
    markdown: catMd(cat),
    subcategories: Array.from(cat.subcategories.values()).map((sub) => {
      const t = taxonomyEntry(cat.name, sub.name);
      return {
        subcategory: sub.name,
        slug: sub.slug,
        count: sub.repos.length,
        path: subPath(cat, sub),
        markdown: subMd(cat, sub),
        covers: t?.covers ?? '',
        not_for: t?.not_for ?? '',
        examples: t?.examples ?? [],
      };
    }),
  }));
}

export function listJsonLd(name: string, repos: Repo[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: repos.length,
    itemListElement: repos.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: `${r.owner}/${r.name}`,
        url: r.url,
        description: oneLine(r.description),
        ...(r.language ? { programmingLanguage: r.language } : {}),
        keywords: r.topics ?? [],
      },
    })),
  };
}

export const textResponse = (body: string, type = 'text/plain') =>
  new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });

export const jsonResponse = (data: unknown) =>
  new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });

export { allRepos };
