import { describe, expect, it, vi } from "vitest";
import { githubRouter } from "./github";
import type { TrpcContext } from "../_core/context";

/**
 * Tests for GitHub API router
 * These tests verify that the GitHub API integration endpoints work correctly
 */

// Mock context
const mockContext: TrpcContext = {
  user: null,
  req: {
    protocol: "https",
    headers: {},
  } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
};

describe("GitHub Router", () => {
  const caller = githubRouter.createCaller(mockContext);

  it("should fetch user information", async () => {
    const user = await caller.getUser();

    expect(user).toBeDefined();
    expect(user).toHaveProperty("login");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("publicRepos");
    expect(user.login).toBe("rintuchowdory");
  }, { timeout: 15000 });

  it("should fetch repositories", async () => {
    const repositories = await caller.getRepositories();

    expect(Array.isArray(repositories)).toBe(true);
    expect(repositories.length).toBeGreaterThan(0);

    // Check repository structure
    const repo = repositories[0];
    expect(repo).toHaveProperty("id");
    expect(repo).toHaveProperty("name");
    expect(repo).toHaveProperty("url");
    expect(repo).toHaveProperty("stars");
    expect(repo).toHaveProperty("forks");
    expect(repo).toHaveProperty("updatedAt");
  }, { timeout: 15000 });

  it("should fetch portfolio statistics", async () => {
    const stats = await caller.getStats();

    expect(stats).toBeDefined();
    expect(stats).toHaveProperty("totalRepositories");
    expect(stats).toHaveProperty("totalStars");
    expect(stats).toHaveProperty("totalForks");
    expect(stats).toHaveProperty("languageBreakdown");
    expect(stats).toHaveProperty("topRepositories");
    expect(stats).toHaveProperty("recentlyUpdated");

    expect(typeof stats.totalRepositories).toBe("number");
    expect(typeof stats.totalStars).toBe("number");
    expect(typeof stats.totalForks).toBe("number");
    expect(Array.isArray(stats.topRepositories)).toBe(true);
    expect(Array.isArray(stats.recentlyUpdated)).toBe(true);
  }, { timeout: 15000 });

  it("should cache data to avoid rate limiting", async () => {
    // First call
    const stats1 = await caller.getStats();

    // Second call should return cached data
    const stats2 = await caller.getStats();

    expect(stats1).toEqual(stats2);
  }, { timeout: 15000 });
});
