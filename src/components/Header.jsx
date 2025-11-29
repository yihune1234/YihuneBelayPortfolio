import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle.jsx';

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
    // Set the active section first
    setActiveSection(id);

    // If mobile menu is open and the user clicked the same active item,
    // don't close the menu (prevents accidental toggle-back behavior).
    if (isMobileMenuOpen && activeSection === id) {
      // keep menu open
      return;
    }

    // Close mobile menu after navigation on mobile
    setIsMobileMenuOpen(false);
    // Scroll to top to ensure header is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
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
            <motion.ul
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-4 space-y-3 pb-4 bg-slate-800/80 rounded-lg px-4 py-3 overflow-hidden border border-slate-700"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
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
              <li className="pt-2">
                <ThemeToggle />
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
