import { GitHubClient } from "./github/client";
import { loadEnvironment } from "./github/auth";

async function main() {
  try {
    console.log("🚀 Testing GitHub API connectivity...\n");

    const { token, username } = loadEnvironment();
    console.log(`📝 Using GitHub username: ${username}\n`);

    const client = new GitHubClient(token);

    console.log("🔐 Authenticating with GitHub API...");
    await client.authenticate();

    console.log("\n📦 Fetching first 5 starred repositories...");
    const repos = await client.getStarredRepos(username, 5);

    console.log(`\n✅ Successfully retrieved ${repos.length} repos:\n`);
    repos.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.owner}/${repo.name}`);
      console.log(`   URL: ${repo.url}`);
      console.log(`   Language: ${repo.language || "N/A"}`);
      console.log(`   Stars: ${repo.stars}`);
      console.log(`   Topics: ${repo.topics.join(", ") || "None"}`);
      if (repo.description) {
        console.log(`   Description: ${repo.description.substring(0, 60)}...`);
      }
      console.log("");
    });

    console.log("✨ GitHub API is working correctly!");
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
