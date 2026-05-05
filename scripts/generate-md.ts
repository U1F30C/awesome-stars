#!/usr/bin/env tsx
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "data", "classified_final.json");
const MD_PATH = path.join(ROOT, "data", "classification_final.md");

type Repo = {
  name: string;
  url?: string;
  description?: string;
  language?: string;
  stars?: number;
  category: string;
  subcategory: string;
};

const CAT_ORDER = [
  "AI, LLMs & Data",
  "Web Development",
  "Infrastructure & Systems",
  "Libraries & Utilities",
  "Languages & Engineering",
  "Standalone Tools & Apps",
  "Knowledge & Inspiration",
];

const data: Repo[] = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

const tree = new Map<string, Map<string, Repo[]>>();
for (const r of data) {
  if (!r.category || !r.subcategory) continue;
  if (!tree.has(r.category)) tree.set(r.category, new Map());
  const subs = tree.get(r.category)!;
  if (!subs.has(r.subcategory)) subs.set(r.subcategory, []);
  subs.get(r.subcategory)!.push(r);
}
for (const subs of tree.values())
  for (const repos of subs.values())
    repos.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));

const lines: string[] = [
  "# Classification Summary\n",
  `**Total repos:** ${data.length}\n\n---\n`,
];
for (const cat of CAT_ORDER) {
  const subs = tree.get(cat);
  if (!subs) continue;
  const total = [...subs.values()].reduce((s, v) => s + v.length, 0);
  lines.push(`\n## ${cat} (${total} repos)\n`);
  for (const [sub, repos] of [...subs.entries()].sort()) {
    lines.push(`\n### ${sub} (${repos.length} repos)\n`);
    lines.push("| Repo | Stars | Language | Description |\n");
    lines.push("|------|-------|----------|-------------|\n");
    for (const r of repos) {
      const desc = (r.description ?? "").replace(/\|/g, "\\|").slice(0, 80);
      lines.push(`| [${r.name}](${r.url ?? ""}) | ${(r.stars ?? 0).toLocaleString()} | ${r.language ?? ""} | ${desc} |\n`);
    }
  }
}

fs.writeFileSync(MD_PATH, lines.join(""));
console.log(`Written ${MD_PATH} (${data.length} repos)`);
