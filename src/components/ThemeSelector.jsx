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
        className="p-3 rounded-2xl glass hover:bg-white/10 transition-all active:scale-95 group border-white/20"
        aria-label="Toggle Theme Ecosystem"
      >
        <Palette className="w-5 h-5 text-primary group-hover:rotate-180 transition-transform duration-700" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20, rotateX: -10 }}
              className="absolute right-0 mt-6 w-80 glass-card p-6 z-50 rounded-[2.5rem] border-white/30 shadow-2xl backdrop-blur-3xl perspective-1000"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight">Visual Identity</h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Select Environment</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`relative p-4 rounded-3xl border-2 transition-all group overflow-hidden ${
                      currentTheme === theme.id
                        ? 'border-primary bg-primary/5'
                        : 'border-white/5 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} shadow-lg shadow-black/20`} />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-sm uppercase tracking-wider">{theme.name}</span>
                          {currentTheme === theme.id && (
                            <motion.div layoutId="checkIcon">
                               <Check className="w-4 h-4 text-primary" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-tight">{theme.description}</p>
                      </div>
                    </div>
                    {/* Animated Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-muted-foreground italic">
                  Systems Aesthetic: {currentThemeData.name}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

