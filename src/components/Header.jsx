import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    // Set the active section
    setActiveSection(id);
    
    // Smooth scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <header

      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-slate-800/98 backdrop-blur-sm shadow-lg shadow-blue-600/10' : 'bg-slate-800/95 backdrop-blur-sm shadow-md shadow-blue-600/10'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavClick('home')}
            className="header-brand transition-colors font-poppins font-bold text-2xl"
          >
           Yihune
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-all duration-300 relative pb-1 font-poppins nav-link ${
                    activeSection === item.id ? 'nav-link--active nav-underline' : ''
                  }`}
                  style={activeSection === item.id ? { color: 'var(--primary)' } : undefined}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-2 left-0 right-0 nav-underline" style={{ background: 'var(--primary)' }}></span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 ml-3">
            <ThemeSelector />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-50 hover:text-blue-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Full-screen dim background so menu is clearly above all content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Fixed dropdown panel anchored below header */}
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="md:hidden fixed left-4 right-4 top-[72px] space-y-3 pb-4 bg-slate-800/95 rounded-xl px-4 py-3 border border-slate-700 z-[130] shadow-xl"
              >
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.25 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left py-2 px-3 rounded-md transition-all duration-300 font-poppins nav-link ${
                        activeSection === item.id
                          ? 'nav-link--active mobile-nav-active nav-underline'
                          : ''
                      }`}
                      style={
                        activeSection === item.id
                          ? { color: 'var(--primary)', background: 'color-mix(in oklab, var(--primary) 10%, transparent)' }
                          : undefined
                      }
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
                <li className="pt-2 flex items-center gap-2">
                  <ThemeSelector />
                  <ThemeToggle />
                </li>
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
