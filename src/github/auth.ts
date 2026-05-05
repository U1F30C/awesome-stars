import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

export function loadEnvironment(): { token: string; username: string } {
  const envPath = path.join(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    throw new Error(
      ".env file not found. Please copy .env.example to .env and add your GitHub token."
    );
  }

  dotenv.config({ path: envPath });

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  if (!username) {
    throw new Error("GITHUB_USERNAME environment variable is not set");
  }

  return { token, username };
}
