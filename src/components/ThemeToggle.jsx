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
      className={`relative p-2 rounded-xl glass border-white/20 transition-all duration-500 hover:scale-105 active:scale-95 group overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-white/10'}`}
      aria-label="Toggle Light/Dark Mode"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-primary'}`} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 10, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -10, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="relative z-10"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          ) : (
            <Moon className="w-5 h-5 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

