import { useState, useEffect } from 'react';
import { Menu, X, Globe, Settings } from 'lucide-react';
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
    
    if (id === 'admin') {
      setActiveSection('admin');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled 
        ? 'py-4' 
        : 'py-8'
      }`}
    >
      <div className={`container-custom !max-w-6xl mx-auto transition-all duration-500 ${isScrolled 
        ? 'glass-card !rounded-full !py-3 !px-8 shadow-2xl border-white/20' 
        : ''
      }`}>
        <div className="flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => handleNavClick('home')}
            className="relative group flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain relative z-10 transition-transform group-hover:scale-110" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none">
                Yihune<span className="text-primary italic">Belay</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground mt-1">Software Engineer</span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-link text-sm uppercase tracking-widest ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="h-4 w-[2px] bg-border/50 mx-2" />

            <div className="flex items-center gap-4">
              <ThemeSelector />
              <ThemeToggle />
              <button
                onClick={() => handleNavClick('admin')}
                className="p-3 glass rounded-2xl hover:text-primary transition-all hover:rotate-90 duration-500 border-white/20"
                title="Admin Control Center"
              >
                <Settings size={20} />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 glass rounded-2xl border-white/20"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-4 top-24 z-[101]"
          >
            <div className="glass-card p-10 border-white/20 shadow-2xl rounded-[2.5rem] flex flex-col gap-10">
              <ul className="flex flex-col gap-6">
                {navItems.map((item, idx) => (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`text-4xl font-black uppercase tracking-tighter transition-all ${activeSection === item.id ? 'text-primary scale-105' : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-10 border-t border-white/10">
                <div className="flex gap-4">
                  <ThemeSelector />
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="p-4 glass rounded-2xl flex items-center justify-center text-primary border-white/20"
                  >
                    <Settings size={28} />
                  </button>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                  Systems Online
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

