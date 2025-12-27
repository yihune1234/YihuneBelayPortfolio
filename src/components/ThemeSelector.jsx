import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check } from 'lucide-react';

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'blue',
      name: 'Ocean Blue',
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#60a5fa',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Professional and trustworthy'
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      primary: '#a855f7',
      secondary: '#7c3aed',
      accent: '#c084fc',
      gradient: 'from-purple-500 to-pink-600',
      description: 'Creative and innovative'
    },
    {
      id: 'green',
      name: 'Forest Green',
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      gradient: 'from-green-500 to-emerald-600',
      description: 'Fresh and natural'
    },
    {
      id: 'orange',
      name: 'Sunset Orange',
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      gradient: 'from-orange-500 to-red-600',
      description: 'Energetic and bold'
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolioTheme') || 'blue';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId) => {
    // Remove all theme classes first
    const themeClasses = ['theme-blue', 'theme-purple', 'theme-green', 'theme-orange'];
    document.documentElement.classList.remove(...themeClasses);
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${themeId}`);
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem('portfolioTheme', themeId);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl glass hover:bg-white/20 transition-all active:scale-95"
        aria-label="Change theme"
        title="Change color theme"
      >
        <Palette className="w-5 h-5" style={{ color: 'var(--primary)' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-4 w-72 md:w-80 glass-card p-4 z-50 rounded-2xl border border-white/20"
            >
              <div className="mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[var(--primary)]" />
                  Color Palette
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Personalize your viewing experience
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-left flex flex-col gap-2 ${
                      currentTheme === theme.id
                        ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                        : 'border-transparent hover:border-white/20 bg-black/5 dark:bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-full h-12 rounded-lg bg-gradient-to-br ${theme.gradient} shadow-sm`}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{theme.name}</span>
                      {currentTheme === theme.id && <Check className="w-3 h-3 text-[var(--primary)]" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
