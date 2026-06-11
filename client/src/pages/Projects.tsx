import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { ExternalLink, Github, Star, GitFork, AlertCircle, Loader } from 'lucide-react';

interface ProjectFilters {
  language: string;
  search: string;
}

export default function Projects() {
  const [filters, setFilters] = useState<ProjectFilters>({
    language: 'all',
    search: '',
  });

  // Fetch repositories from GitHub API
  const { data: repositories, isLoading, error } = trpc.github.getRepositories.useQuery();
  const { data: stats } = trpc.github.getStats.useQuery();

  // Filter and search repositories
  const filteredRepositories = useMemo(() => {
    if (!repositories) return [];

    return (repositories as any).filter((repo: any) => {
      const matchesLanguage =
        filters.language === 'all' || repo.language === filters.language;
      const matchesSearch =
        repo.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(filters.search.toLowerCase()) ?? false);

      return matchesLanguage && matchesSearch;
    });
  }, [repositories, filters]);

  const languages = useMemo(() => {
    if (!repositories) return [];
    const langs = new Set((repositories as any).map((r: any) => r.language).filter(Boolean) as string[]);
    return Array.from(langs).sort();
  }, [repositories]);

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-destructive mb-2">Failed to Load Projects</h2>
              <p className="text-sm text-destructive/80">
                {error instanceof Error ? error.message : 'Unknown error occurred'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7C3AED]/10 to-[#FF6B35]/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">GitHub Projects</h1>
          <p className="text-muted-foreground">
            Real-time project data from your GitHub repositories
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Total Repositories</p>
              <p className="text-3xl font-bold text-[#7C3AED]">{stats.totalRepositories}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Total Stars</p>
              <p className="text-3xl font-bold text-[#FF6B35]">{stats.totalStars}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Total Forks</p>
              <p className="text-3xl font-bold text-[#10B981]">{stats.totalForks}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Languages Used</p>
              <p className="text-3xl font-bold text-[#EC4899]">
                {Object.keys(stats.languageBreakdown).length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search Projects</label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filter by Language</label>
            <select
              value={filters.language}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, language: e.target.value }))
              }
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-full mb-3" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : filteredRepositories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects found matching your filters</p>
            <button
              onClick={() => setFilters({ language: 'all', search: '' })}
              className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#7C3AED]/90 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepositories.map((repo: any) => (
              <div
                key={repo.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-[#7C3AED] transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{repo.name}</h3>
                    {repo.language && (
                      <span className="inline-block px-2 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-xs rounded">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic: string) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-secondary text-xs rounded text-muted-foreground"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#FF6B35]" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4 text-[#10B981]" />
                    <span>{repo.forks}</span>
                  </div>
                  <div className="text-xs">Updated {new Date(repo.updatedAt).toLocaleDateString()}</div>
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-[#7C3AED]/10 text-[#7C3AED] text-sm rounded hover:bg-[#7C3AED]/20 transition flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                  )}
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-secondary text-foreground text-sm rounded hover:bg-secondary/80 transition flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {filteredRepositories.length} of {(repositories as any)?.length || 0} repositories
        </div>
      </div>
    </div>
  );
}
