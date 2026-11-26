import type { APIRoute } from 'astro';
import { getCategories } from '../lib/repos';
import { categoryMarkdown, textResponse } from '../lib/agent';

export function getStaticPaths() {
  return Array.from(getCategories().values()).map((cat) => ({ params: { category: cat.slug }, props: { cat } }));
}

export const GET: APIRoute = ({ props }) => textResponse(categoryMarkdown(props.cat), 'text/markdown');
