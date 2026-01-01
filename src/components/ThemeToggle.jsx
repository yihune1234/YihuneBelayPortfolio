import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95 group relative overflow-hidden border-white/20 shadow-xl"
      aria-label="Synchronize Environment"
    >
      <div className={`absolute inset-0 opacity-20 blur-lg transition-colors duration-500 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-indigo-500'}`} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 30, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -30, opacity: 0, rotate: 45 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="relative z-10"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative HUD Elements */}
      <div className="absolute top-0 right-0 w-1 h-1 bg-white/40 rounded-full m-1" />
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-white/20 rounded-full m-1" />
    </button>
  );
}

