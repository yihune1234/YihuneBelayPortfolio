import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle.jsx';
import { ThemeSelector } from './ThemeSelector.jsx';

export function Header({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);

    // Smooth scroll to top
    if (id !== 'admin') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'glass-card border-none shadow-xl py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => handleNavClick('home')}
          className="relative group flex items-center gap-3 px-4 py-2 glass-card rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[var(--primary)]/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="text-[var(--primary)] flex items-center justify-center"
          >
            <Globe size={20} className="drop-shadow-[0_0_8px_var(--primary)]" />
          </motion.div>
          <div className="flex items-center gap-2 relative z-10">
            <img src="/images/profile.jpg" alt="Y B Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-black tracking-tighter uppercase">
              Yihune<span className="text-[var(--primary)]">.</span>
            </span>
          </div>
          {/* Animated Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500" />
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-border mx-2" />

          <div className="flex items-center gap-3">
            <ThemeSelector />
            <ThemeToggle />
          </div>

          <button
            onClick={() => handleNavClick('admin')}
            className="ml-2 btn-primary !py-2 !px-5 text-sm"
          >
            Admin
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 glass rounded-xl"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="container-custom py-8 flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`text-2xl font-bold transition-colors ${activeSection === item.id ? 'text-[var(--primary)]' : 'text-muted-foreground'
                        }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <ThemeSelector />
                <button
                  onClick={() => handleNavClick('admin')}
                  className="btn-primary flex-1"
                >
                  Admin Access
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
