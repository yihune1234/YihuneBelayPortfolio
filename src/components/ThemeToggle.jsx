import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <button onClick={toggle} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white/95 text-slate-800 hover:bg-slate-50 transition-colors">
      <span className="w-2 h-2 rounded-full" style={{ background: theme === 'dark' ? 'var(--primary)' : 'var(--secondary)' }} />
      <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
