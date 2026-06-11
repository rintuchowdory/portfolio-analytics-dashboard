import { ENV } from "./_core/env";

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  createdAt: string;
  updatedAt: string;
  topics: string[];
}

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
}

/**
 * Fetch authenticated user information from GitHub
 */
export async function fetchGitHubUser(): Promise<GitHubUser> {
  const token = ENV.githubToken;
  if (!token) {
    throw new Error("GitHub token not configured");
  }

  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = (await response.json()) as {
    login: string;
    name: string | null;
    bio: string | null;
    company: string | null;
    location: string | null;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
  };

  return {
    login: data.login,
    name: data.name,
    bio: data.bio,
    company: data.company,
    location: data.location,
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
    avatarUrl: data.avatar_url,
  };
}

/**
 * Fetch all repositories for the authenticated user
 */
export async function fetchGitHubRepositories(): Promise<GitHubRepository[]> {
  const token = ENV.githubToken;
  if (!token) {
    throw new Error("GitHub token not configured");
  }

  const repositories: GitHubRepository[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://api.github.com/user/repos?page=${page}&per_page=100&sort=updated&direction=desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = (await response.json()) as Array<{
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      open_issues_count: number;
      created_at: string;
      updated_at: string;
      topics: string[];
    }>;

    if (data.length === 0) {
      hasMore = false;
    } else {
      repositories.push(
        ...data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          openIssues: repo.open_issues_count,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          topics: repo.topics,
        }))
      );
      page++;
    }
  }

  return repositories;
}

/**
 * Fetch repository details including languages breakdown
 */
export async function fetchRepositoryLanguages(
  owner: string,
  repo: string
): Promise<Record<string, number>> {
  const token = ENV.githubToken;
  if (!token) {
    throw new Error("GitHub token not configured");
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return (await response.json()) as Record<string, number>;
}

/**
 * Cache for GitHub data to avoid rate limiting
 */
const cache: Map<string, { data: unknown; timestamp: number }> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function getCachedData(key: string): unknown | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

export function setCachedData(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache(): void {
  cache.clear();
}
