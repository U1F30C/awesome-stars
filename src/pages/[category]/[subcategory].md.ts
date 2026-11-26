import type { APIRoute } from 'astro';
import { getCategories } from '../../lib/repos';
import { subMarkdown, textResponse } from '../../lib/agent';

export function getStaticPaths() {
  return Array.from(getCategories().values()).flatMap((cat) =>
    Array.from(cat.subcategories.values()).map((sub) => ({
      params: { category: cat.slug, subcategory: sub.slug },
      props: { cat, sub },
    }))
  );
}

export const GET: APIRoute = ({ props }) => textResponse(subMarkdown(props.cat, props.sub), 'text/markdown');
