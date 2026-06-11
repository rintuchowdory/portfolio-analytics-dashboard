import { useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/projects', label: 'Projects' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-accent transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#FF6B35] flex items-center justify-center text-white font-bold">
              PA
            </div>
            <span className="hidden sm:inline">Portfolio Analytics</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-accent border-b-2 border-accent pb-2'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-border pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
