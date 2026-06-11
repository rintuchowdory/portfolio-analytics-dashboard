import { publicProcedure, router } from "../_core/trpc";
import {
  fetchGitHubRepositories,
  fetchGitHubUser,
  getCachedData,
  setCachedData,
} from "../github-service";

export const githubRouter = router({
  /**
   * Fetch authenticated user information
   */
  getUser: publicProcedure.query(async () => {
    const cacheKey = "github:user";
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    const user = await fetchGitHubUser();
    setCachedData(cacheKey, user);
    return user;
  }),

  /**
   * Fetch all repositories for the authenticated user
   */
  getRepositories: publicProcedure.query(async () => {
    const cacheKey = "github:repositories";
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    const repositories = await fetchGitHubRepositories();
    setCachedData(cacheKey, repositories);
    return repositories;
  }),

  /**
   * Get repository statistics
   */
  getStats: publicProcedure.query(async () => {
    const repositories = await fetchGitHubRepositories();

    const stats = {
      totalRepositories: repositories.length,
      totalStars: repositories.reduce((sum, repo) => sum + repo.stars, 0),
      totalForks: repositories.reduce((sum, repo) => sum + repo.forks, 0),
      languageBreakdown: {} as Record<string, number>,
      topRepositories: repositories
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 10),
      recentlyUpdated: repositories
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .slice(0, 10),
    };

    // Calculate language breakdown
    repositories.forEach((repo) => {
      if (repo.language) {
        stats.languageBreakdown[repo.language] =
          (stats.languageBreakdown[repo.language] || 0) + 1;
      }
    });

    return stats;
  }),
});
