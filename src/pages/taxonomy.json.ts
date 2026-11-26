import type { APIRoute } from 'astro';
import { jsonResponse, taxonomyJson } from '../lib/agent';

export const GET: APIRoute = () => jsonResponse(taxonomyJson());
