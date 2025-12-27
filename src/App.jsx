import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Projects } from './components/Projects.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { TelegramFloatingButton } from './components/TelegramFloatingButton.jsx';
import { AdminLogin } from './admin/AdminLogin.jsx';
import { AdminDashboard } from './admin/AdminDashboard.jsx';
import { PhotoLog } from './components/PhotoLog.jsx';


export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminAuthenticated(true);
    }

    // Check for saved theme
    const savedTheme = localStorage.getItem('portfolioTheme') || 'blue';
    document.documentElement.classList.add(`theme-${savedTheme}`);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAdminLogin = (token, admin) => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
    setActiveSection('home');
  };

  const renderSection = () => {
    if (activeSection === 'admin') {
      return isAdminAuthenticated ? (
        <AdminDashboard onLogout={handleAdminLogout} />
      ) : (
        <AdminLogin onLogin={handleAdminLogin} />
      );
    }

    const sections = {
      home: (
        <>
          <Hero setActiveSection={setActiveSection} />
          <PhotoLog />
        </>
      ),

      about: <About />,
      projects: <Projects />,
      contact: <Contact />
    };
    return sections[activeSection] || sections.home;
  };

  const isAdminView = activeSection === 'admin' && isAdminAuthenticated;

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminView && (
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      )}

      <main className={`flex-1 ${!isAdminView ? 'pt-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection + (isAdminAuthenticated ? '-auth' : '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {!isAdminView && <Footer setActiveSection={setActiveSection} />}
      {!isAdminView && <TelegramFloatingButton />}
    </div>
  );
}
