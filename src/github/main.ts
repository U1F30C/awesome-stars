import * as fs from "fs";
import * as path from "path";
import { GitHubClient } from "./client";
import { loadEnvironment } from "./auth";

const CLASSIFIED_PATH = path.join(process.cwd(), "data", "classified_final.json");

type ClassifiedRepo = {
  id: number | null;
  name: string;
  owner: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
  category: string;
  subcategory: string;
};

async function main() {
  try {
    console.log("🚀 awesome-stars - Syncing GitHub Stars\n");

    const { token, username } = loadEnvironment();
    const client = new GitHubClient(token);

    await client.authenticate();
    console.log(`\nFetching all starred repositories for @${username}...`);

    const fetched = await client.getStarredRepos(username, 100);
    console.log(`✅ Retrieved ${fetched.length} starred repositories`);

    let existing: ClassifiedRepo[] = [];
    if (fs.existsSync(CLASSIFIED_PATH)) {
      existing = JSON.parse(fs.readFileSync(CLASSIFIED_PATH, "utf8"));
    }

    const byId = new Map(existing.map((r) => [r.id, r]));
    const byName = new Map(existing.map((r) => [r.name.toLowerCase(), r]));

    let updated = 0;
    const newRepos: ClassifiedRepo[] = [];

    for (const repo of fetched) {
      const match = byId.get(repo.id) ?? byName.get(repo.name.toLowerCase());

      if (match) {
        match.id = repo.id;
        match.name = repo.name;
        match.owner = repo.owner;
        match.url = repo.url;
        match.description = repo.description;
        match.language = repo.language;
        match.stars = repo.stars;
        match.topics = repo.topics;
        match.updatedAt = repo.updatedAt;
        updated++;
      } else {
        newRepos.push({ ...repo, category: "", subcategory: "" });
      }
    }

    existing.push(...newRepos);
    fs.writeFileSync(CLASSIFIED_PATH, JSON.stringify(existing, null, 2));

    console.log(`\n💾 Saved to data/classified_final.json`);
    console.log(`   ${updated} updated · ${newRepos.length} new`);

    if (newRepos.length > 0) {
      console.log("\nNew repos to classify:");
      for (const r of newRepos) {
        console.log(`  ${r.owner}/${r.name} — ${r.description ?? ""}`);
      }
    }
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
