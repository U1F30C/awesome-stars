import type { APIRoute } from 'astro';
import { getCategories, allRepos } from '../lib/repos';
import { SITE_NAME, SITE_TAGLINE, catMd, subMd, textResponse, taxonomyEntry } from '../lib/agent';
import { href } from '../lib/url';

export const GET: APIRoute = () => {
  const cats = Array.from(getCategories().values());
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_TAGLINE}. ${allRepos.length} repositories in ${cats.length} categories, each assigned one category and one subcategory by main purpose (not language).`,
    '',
    '## How to use this site',
    '',
    `- [repos.json](${href('/repos.json')}): every repository as a flat JSON array (name, owner, url, description, language, stars, topics, category, subcategory, slugs). Best for searching: fetch once and filter locally.`,
    `- [taxonomy.json](${href('/taxonomy.json')}): every category/subcategory with counts, what it covers, what it is not for, examples and page paths. Read this to pick where to look.`,
    `- [llms-full.txt](${href('/llms-full.txt')}): the whole catalog as markdown in a single file.`,
    `- Every category and subcategory page has a markdown twin: append \`.md\` to the path without the trailing slash (e.g. \`/{category}.md\`, \`/{category}/{subcategory}.md\`). The links below point to them.`,
    `- Human search: \`${href('/')}?q=<query>\` opens the fuzzy search prefilled (needs JavaScript; agents should use repos.json instead).`,
    '',
    '## Categories',
    '',
    ...cats.flatMap((cat) => [
      `### [${cat.name}](${catMd(cat)}) (${cat.repos.length})`,
      '',
      ...Array.from(cat.subcategories.values()).map((sub) => {
        const t = taxonomyEntry(cat.name, sub.name);
        return `- [${sub.name}](${subMd(cat, sub)}) (${sub.repos.length})${t ? `: ${t.covers}` : ''}`;
      }),
      '',
    ]),
  ];
  return textResponse(lines.join('\n'));
};
