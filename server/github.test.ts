import { describe, expect, it, beforeAll } from "vitest";
import { ENV } from "./_core/env";

/**
 * Test to validate GitHub API token by making a lightweight API call
 * This ensures the GITHUB_TOKEN secret is valid before proceeding with integration
 */
describe("GitHub API Integration", () => {
  beforeAll(() => {
    console.log("Starting GitHub API validation test...");
  });
  it("validates GitHub token by fetching authenticated user data", async () => {
    const token = ENV.githubToken;
    
    if (!token) {
      throw new Error("GITHUB_TOKEN environment variable is not set");
    }

    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      expect(response.status).toBe(200);
      
      const data = (await response.json()) as { login?: string; id?: number };
      expect(data.login).toBeDefined();
      expect(data.id).toBeDefined();
      
      console.log(`✓ GitHub token validated for user: ${data.login}`);
    } catch (error) {
      throw new Error(`Failed to validate GitHub token: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, { timeout: 15000 });
});
