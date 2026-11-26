import type { APIRoute } from 'astro';
import { allRepos, jsonResponse, slimRepo } from '../lib/agent';

export const GET: APIRoute = () =>
  jsonResponse([...allRepos].sort((a, b) => b.stars - a.stars).map(slimRepo));
