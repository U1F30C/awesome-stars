import rawRepos from '../../data/classified_final.json';

export interface Repo {
  id: number;
  name: string;
  owner: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  topics: string[];
  updatedAt: string;
  category: string;
  subcategory: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatStars(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

export const allRepos: Repo[] = (rawRepos as Repo[]).filter(
  (r) => r.category && r.category.trim() !== ''
);

export interface SubcategoryData {
  name: string;
  slug: string;
  repos: Repo[];
}

export interface CategoryData {
  name: string;
  slug: string;
  subcategories: Map<string, SubcategoryData>;
  repos: Repo[];
}

export function getCategories(): Map<string, CategoryData> {
  const map = new Map<string, CategoryData>();

  for (const repo of allRepos) {
    const catSlug = slugify(repo.category);
    const subSlug = slugify(repo.subcategory);

    if (!map.has(catSlug)) {
      map.set(catSlug, {
        name: repo.category,
        slug: catSlug,
        subcategories: new Map(),
        repos: [],
      });
    }

    const cat = map.get(catSlug)!;
    cat.repos.push(repo);

    if (!cat.subcategories.has(subSlug)) {
      cat.subcategories.set(subSlug, {
        name: repo.subcategory,
        slug: subSlug,
        repos: [],
      });
    }

    cat.subcategories.get(subSlug)!.repos.push(repo);
  }

  // Sort repos by stars descending in each category and subcategory
  for (const cat of map.values()) {
    cat.repos.sort((a, b) => b.stars - a.stars);
    for (const sub of cat.subcategories.values()) {
      sub.repos.sort((a, b) => b.stars - a.stars);
    }
  }

  return map;
}

const COLOR_MAP: Record<string, string> = {
  'AI, LLMs & Data': 'violet',
  'Web Development': 'blue',
  'Infrastructure & Systems': 'orange',
  'Libraries & Utilities': 'emerald',
  'Languages & Engineering': 'rose',
  'Standalone Tools & Apps': 'cyan',
  'Knowledge & Inspiration': 'amber',
};

export function categoryColor(name: string): {
  header: string;
  badge: string;
  pill: string;
  pillActive: string;
  border: string;
  text: string;
} {
  const color = COLOR_MAP[name] ?? 'slate';

  const styles: Record<string, ReturnType<typeof categoryColor>> = {
    violet: {
      header: 'bg-violet-600',
      badge: 'bg-violet-100 text-violet-800',
      pill: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100',
      pillActive: 'bg-violet-600 text-white border-violet-600',
      border: 'border-violet-200',
      text: 'text-violet-700',
    },
    blue: {
      header: 'bg-blue-600',
      badge: 'bg-blue-100 text-blue-800',
      pill: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      pillActive: 'bg-blue-600 text-white border-blue-600',
      border: 'border-blue-200',
      text: 'text-blue-700',
    },
    orange: {
      header: 'bg-orange-600',
      badge: 'bg-orange-100 text-orange-800',
      pill: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
      pillActive: 'bg-orange-600 text-white border-orange-600',
      border: 'border-orange-200',
      text: 'text-orange-700',
    },
    emerald: {
      header: 'bg-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800',
      pill: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      pillActive: 'bg-emerald-600 text-white border-emerald-600',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
    },
    rose: {
      header: 'bg-rose-600',
      badge: 'bg-rose-100 text-rose-800',
      pill: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
      pillActive: 'bg-rose-600 text-white border-rose-600',
      border: 'border-rose-200',
      text: 'text-rose-700',
    },
    cyan: {
      header: 'bg-cyan-600',
      badge: 'bg-cyan-100 text-cyan-800',
      pill: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100',
      pillActive: 'bg-cyan-600 text-white border-cyan-600',
      border: 'border-cyan-200',
      text: 'text-cyan-700',
    },
    amber: {
      header: 'bg-amber-600',
      badge: 'bg-amber-100 text-amber-800',
      pill: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
      pillActive: 'bg-amber-600 text-white border-amber-600',
      border: 'border-amber-200',
      text: 'text-amber-700',
    },
    slate: {
      header: 'bg-slate-600',
      badge: 'bg-slate-100 text-slate-800',
      pill: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100',
      pillActive: 'bg-slate-600 text-white border-slate-600',
      border: 'border-slate-200',
      text: 'text-slate-700',
    },
  };

  return styles[color];
}

export function getTopLanguages(repos: Repo[], n = 3): string[] {
  const freq: Record<string, number> = {};
  for (const r of repos) {
    if (r.language) {
      freq[r.language] = (freq[r.language] ?? 0) + 1;
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([lang]) => lang);
}
