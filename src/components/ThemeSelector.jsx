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
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.primary);
      document.documentElement.style.setProperty('--primary-dark', theme.secondary);
      document.documentElement.style.setProperty('--primary-light', theme.accent);
    }
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
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        aria-label="Change theme"
        title="Change color theme"
      >
        <Palette className="w-5 h-5" style={{ color: currentThemeData?.primary }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Selector Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Choose Your Theme
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Select a color scheme that matches your style
                </p>
              </div>

              <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      currentTheme === theme.id
                        ? 'border-current shadow-md'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                    style={{
                      borderColor: currentTheme === theme.id ? theme.primary : undefined
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${theme.gradient} shadow-md`}
                        />
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-100">
                            {theme.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {theme.description}
                          </div>
                        </div>
                      </div>
                      {currentTheme === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="w-8 h-2 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className="w-8 h-2 rounded-full"
                        style={{ backgroundColor: theme.secondary }}
                      />
                      <div
                        className="w-8 h-2 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                  Your theme preference is saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
