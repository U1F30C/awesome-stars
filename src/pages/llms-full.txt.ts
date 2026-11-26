import type { APIRoute } from 'astro';
import { getCategories, allRepos } from '../lib/repos';
import { SITE_NAME, SITE_TAGLINE, subMarkdown, textResponse } from '../lib/agent';

export const GET: APIRoute = () => {
  const cats = Array.from(getCategories().values());
  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_TAGLINE}. ${allRepos.length} repositories in ${cats.length} categories.`,
    '',
    ...cats.flatMap((cat) => [
      `# ${cat.name}`,
      '',
      ...Array.from(cat.subcategories.values()).map((sub) => subMarkdown(cat, sub).replace(/^# /, '## ')),
    ]),
  ].join('\n');
  return textResponse(body);
};
