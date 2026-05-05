import { Octokit } from "@octokit/rest";

export interface StarredRepo {
  id: number;
  name: string;
  owner: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
}

export class GitHubClient {
  private octokit: Octokit;

  constructor(token: string) {
    if (!token) {
      throw new Error("GitHub token is required");
    }
    this.octokit = new Octokit({ auth: token });
  }

  async authenticate(): Promise<boolean> {
    try {
      const user = await this.octokit.rest.users.getAuthenticated();
      console.log(`✓ Authenticated as @${user.data.login}`);
      return true;
    } catch (error) {
      console.error("✗ Failed to authenticate with GitHub API");
      throw error;
    }
  }

  async getStarredRepos(
    username: string,
    perPage: number = 30
  ): Promise<StarredRepo[]> {
    const repos: StarredRepo[] = [];

    try {
      for await (const response of this.octokit.paginate.iterator(
        "GET /users/{username}/starred",
        {
          username,
          per_page: perPage,
        }
      )) {
        for (const item of response.data) {
          const repo = (item as any).repo || item;
          repos.push({
            id: repo.id,
            name: repo.name,
            owner: repo.owner.login,
            url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count,
            topics: repo.topics || [],
            updatedAt: repo.updated_at,
          });
        }
      }

      console.log(`✓ Fetched ${repos.length} starred repositories`);
      return repos;
    } catch (error) {
      console.error("✗ Failed to fetch starred repositories");
      throw error;
    }
  }

  async getRepoDetails(owner: string, repo: string): Promise<any> {
    try {
      const response = await this.octokit.rest.repos.get({ owner, repo });
      return response.data;
    } catch (error) {
      console.error(`✗ Failed to fetch repo details for ${owner}/${repo}`);
      throw error;
    }
  }
}
