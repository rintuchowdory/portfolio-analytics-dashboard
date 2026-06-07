import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Code2, Globe, Zap } from 'lucide-react';

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

        {/* Growth Trend - Line Chart */}
        <div className="col-span-12 card-dashboard p-6 animate-slide-in" data-observe>
          <h2 className="text-heading mb-4">Project Growth Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioData.monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#FF6B35"
                strokeWidth={2}
                dot={{ fill: '#FF6B35', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="deployments"
                stroke="#7C3AED"
                strokeWidth={2}
                dot={{ fill: '#7C3AED', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
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
