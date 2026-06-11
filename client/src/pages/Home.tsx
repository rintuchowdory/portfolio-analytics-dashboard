import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, ComposedChart } from 'recharts';
import { TrendingUp, Code2, Globe, Zap } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';

/**
 * Design System: Vibrant Data Storytelling
 * - Platform colors encode information (Vercel: #FF6B35, Manus: #7C3AED, etc.)
 * - Curved dividers and layered depth create visual warmth
 * - Animations celebrate data discovery
 * - Typography: Poppins (friendly, modern) + Inter (readable, technical)
 */

// Portfolio data structure
const portfolioData = {
  totalProjects: 42,
  platforms: [
    { name: 'Vercel', count: 18, color: '#FF6B35', hex: 'FF6B35' },
    { name: 'Manus', count: 6, color: '#7C3AED', hex: '7C3AED' },
    { name: 'Render', count: 4, color: '#10B981', hex: '10B981' },
    { name: 'Lovable', count: 3, color: '#EC4899', hex: 'EC4899' },
    { name: 'GitHub Pages', count: 4, color: '#1F2937', hex: '1F2937' },
    { name: 'Framer', count: 1, color: '#06B6D4', hex: '06B6D4' },
    { name: 'Replit', count: 1, color: '#FBBF24', hex: 'FBBF24' },
  ],
  projectTypes: [
    { name: 'Web Apps', value: 28, color: '#FF6B35' },
    { name: 'Landing Pages', value: 8, color: '#7C3AED' },
    { name: 'Dashboards', value: 4, color: '#10B981' },
    { name: 'Tools', value: 2, color: '#EC4899' },
  ],
  monthlyGrowth: [
    { month: 'Jan', projects: 5, deployments: 6 },
    { month: 'Feb', projects: 8, deployments: 9 },
    { month: 'Mar', projects: 12, deployments: 14 },
    { month: 'Apr', projects: 18, deployments: 22 },
    { month: 'May', projects: 28, deployments: 32 },
    { month: 'Jun', projects: 42, deployments: 48 },
  ],
  techStack: [
    { name: 'React', percentage: 85 },
    { name: 'Next.js', percentage: 72 },
    { name: 'Node.js', percentage: 45 },
    { name: 'TypeScript', percentage: 65 },
    { name: 'Tailwind CSS', percentage: 78 },
  ],
  // Project complexity vs deployment time scatter data
  projectComplexity: [
    { complexity: 3, deploymentDays: 2, name: 'Landing Page 1', color: '#FF6B35' },
    { complexity: 5, deploymentDays: 3, name: 'Dashboard 1', color: '#7C3AED' },
    { complexity: 7, deploymentDays: 5, name: 'Full Stack App 1', color: '#10B981' },
    { complexity: 4, deploymentDays: 2, name: 'Tool 1', color: '#EC4899' },
    { complexity: 8, deploymentDays: 7, name: 'Complex App 1', color: '#FF6B35' },
    { complexity: 2, deploymentDays: 1, name: 'Simple Page', color: '#06B6D4' },
    { complexity: 6, deploymentDays: 4, name: 'API Integration', color: '#FBBF24' },
    { complexity: 9, deploymentDays: 8, name: 'Enterprise App', color: '#7C3AED' },
  ],
  // Platform activity heatmap data
  platformActivity: [
    { month: 'Jan', Vercel: 2, Manus: 1, Render: 1, Lovable: 1, 'GitHub Pages': 0, Framer: 0, Replit: 0 },
    { month: 'Feb', Vercel: 3, Manus: 1, Render: 1, Lovable: 1, 'GitHub Pages': 1, Framer: 1, Replit: 0 },
    { month: 'Mar', Vercel: 4, Manus: 2, Render: 1, Lovable: 2, 'GitHub Pages': 1, Framer: 1, Replit: 0 },
    { month: 'Apr', Vercel: 5, Manus: 2, Render: 2, Lovable: 2, 'GitHub Pages': 2, Framer: 1, Replit: 0 },
    { month: 'May', Vercel: 6, Manus: 2, Render: 2, Lovable: 2, 'GitHub Pages': 2, Framer: 1, Replit: 1 },
    { month: 'Jun', Vercel: 6, Manus: 2, Render: 2, Lovable: 2, 'GitHub Pages': 2, Framer: 1, Replit: 1 },
  ],
};

// Animated counter component
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-observe]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative w-screen overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663671633663/4favhMmJFbdCUMpWeZQV6a/hero-background-SkrNdiWsuL9NyzqVp4W9LZ.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-4 py-20 text-center">
          <h1 className="text-display text-white mb-4 drop-shadow-lg">
            Portfolio Analytics Dashboard
          </h1>
          <p className="text-lg text-white/90 max-w-2xl drop-shadow-md mb-8">
            Explore <span className="font-bold text-2xl"><AnimatedCounter target={42} /></span> deployed applications across 7 platforms
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            {portfolioData.platforms.map((platform) => (
              <div
                key={platform.name}
                className="badge-platform"
                style={{ backgroundColor: platform.color }}
                title={`${platform.name}: ${platform.count} projects`}
              >
                {platform.count}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="grid-dashboard">
        {/* Key Metrics Row */}
        <div className="col-span-12 md:col-span-3 card-dashboard p-6 animate-slide-in" data-observe>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent text-muted-foreground mb-2">Total Projects</p>
              <p className="text-4xl font-bold text-accent">
                <AnimatedCounter target={portfolioData.totalProjects} />
              </p>
            </div>
            <Code2 className="w-12 h-12 text-[#7C3AED] opacity-20" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 card-dashboard p-6 animate-slide-in" data-observe>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent text-muted-foreground mb-2">Active Platforms</p>
              <p className="text-4xl font-bold text-accent">
                <AnimatedCounter target={portfolioData.platforms.length} />
              </p>
            </div>
            <Globe className="w-12 h-12 text-[#FF6B35] opacity-20" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 card-dashboard p-6 animate-slide-in" data-observe>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent text-muted-foreground mb-2">Avg Apps/Platform</p>
              <p className="text-4xl font-bold text-accent">
                {(portfolioData.totalProjects / portfolioData.platforms.length).toFixed(1)}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-[#10B981] opacity-20" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 card-dashboard p-6 animate-slide-in" data-observe>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent text-muted-foreground mb-2">Tech Stack</p>
              <p className="text-4xl font-bold text-accent">
                <AnimatedCounter target={portfolioData.techStack.length} />
              </p>
            </div>
            <Zap className="w-12 h-12 text-[#EC4899] opacity-20" />
          </div>
        </div>

        {/* Platform Distribution - Pie Chart */}
        <div className="col-span-12 md:col-span-6 card-dashboard p-6 animate-slide-in" data-observe>
          <h2 className="text-heading mb-4">Platform Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioData.platforms}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, count }) => `${name}: ${count}`}
              >
                {portfolioData.platforms.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} projects`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Project Types - Bar Chart */}
        <div className="col-span-12 md:col-span-6 card-dashboard p-6 animate-slide-in" data-observe>
          <h2 className="text-heading mb-4">Project Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={portfolioData.projectTypes}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Trend - Area Chart */}
        <div className="col-span-12 card-dashboard p-6 animate-slide-in" data-observe>
          <h2 className="text-heading mb-4">Project Growth Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData.monthlyGrowth}>
              <defs>
                <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorDeployments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="projects"
                stroke="#FF6B35"
                fillOpacity={1}
                fill="url(#colorProjects)"
              />
              <Area
                type="monotone"
                dataKey="deployments"
                stroke="#7C3AED"
                fillOpacity={1}
                fill="url(#colorDeployments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project Complexity vs Deployment Time - Scatter Chart */}
        <div className="col-span-12 md:col-span-6 card-dashboard p-6 animate-slide-in" data-observe>
          <h2 className="text-heading mb-4">Project Complexity vs Deployment Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="complexity" name="Complexity" />
              <YAxis dataKey="deploymentDays" name="Days to Deploy" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Projects" data={portfolioData.projectComplexity} fill="#FF6B35" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Activity Heatmap - Composed Chart */}
        <div className="col-span-12 md:col-span-6 card-dashboard p-6 animate-slide-in" data-observe>
          <h2 className="text-heading mb-4">Platform Activity Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={portfolioData.platformActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Vercel" fill="#FF6B35" />
              <Bar dataKey="Manus" fill="#7C3AED" />
              <Bar dataKey="Render" fill="#10B981" />
              <Bar dataKey="Lovable" fill="#EC4899" />
              <Line type="monotone" dataKey="GitHub Pages" stroke="#1F2937" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Details Grid */}
        <div className="col-span-12">
          <h2 className="text-heading mb-6 px-4">Platform Breakdown</h2>
        </div>

        {portfolioData.platforms.map((platform, idx) => (
          <div
            key={platform.name}
            className="col-span-12 md:col-span-4 lg:col-span-3 card-dashboard p-4 animate-slide-in"
            data-observe
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="badge-platform"
                style={{ backgroundColor: platform.color }}
              >
                {platform.count}
              </div>
              <div>
                <p className="text-heading">{platform.name}</p>
                <p className="text-xs text-muted-foreground">
                  {((platform.count / portfolioData.totalProjects) * 100).toFixed(1)}% of portfolio
                </p>
              </div>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(platform.count / portfolioData.totalProjects) * 100}%`,
                  backgroundColor: platform.color,
                }}
              />
            </div>
          </div>
        ))}

        {/* Tech Stack Section */}
        <div className="col-span-12">
          <h2 className="text-heading mb-6 px-4">Technology Stack</h2>
        </div>

        {portfolioData.techStack.map((tech, idx) => (
          <div
            key={tech.name}
            className="col-span-12 md:col-span-6 lg:col-span-4 card-dashboard p-4 animate-slide-in"
            data-observe
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-body font-semibold">{tech.name}</p>
              <p className="text-accent text-[#7C3AED]">{tech.percentage}%</p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-[#FF6B35] to-[#7C3AED]"
                style={{ width: `${tech.percentage}%` }}
              />
            </div>
          </div>
        ))}

        {/* Footer Stats */}
        <div className="col-span-12 card-dashboard p-8 bg-gradient-to-r from-[#7C3AED]/5 to-[#FF6B35]/5 animate-slide-in" data-observe>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-[#FF6B35]">
                <AnimatedCounter target={42} />
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Deployments</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#7C3AED]">
                <AnimatedCounter target={7} />
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Platforms</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#10B981]">
                <AnimatedCounter target={5} />
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Core Technologies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#EC4899]">
                <AnimatedCounter target={100} />
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">% Deployed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-border bg-secondary/30">
        <div className="container text-center">
          <p className="text-muted-foreground mb-2">
            Portfolio Analytics Dashboard • Built with React, Recharts & Tailwind CSS
          </p>
          <p className="text-xs text-muted-foreground">
            Tracking 42 projects across Vercel, Manus, Render, Lovable, GitHub Pages, Framer & Replit
          </p>
        </div>
      </footer>
    </div>
  );
}
