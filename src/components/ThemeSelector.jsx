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
    <div className="relative flex items-center">
      <div className="flex items-center glass rounded-2xl border-white/20 p-1 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-xl transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-90' : 'hover:bg-white/10 text-primary'}`}
          title="Customize Theme"
        >
          <Palette className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 border-l border-white/10 ml-1">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className="relative group/swatch"
                    title={theme.name}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.gradient} border-2 transition-all ${
                        currentTheme === theme.id ? 'border-white scale-110 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]' : 'border-transparent opacity-60 hover:opacity-100 shadow-lg'
                      }`}
                    />
                    {currentTheme === theme.id && (
                      <motion.div
                        layoutId="activeTheme"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
}

