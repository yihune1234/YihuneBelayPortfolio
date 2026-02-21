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

    // If there's a hash in the URL, scroll to it
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    if (activeSection === 'admin') return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'projects', 'contact'];
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const handleAdminLogin = (token, admin) => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
    setActiveSection('home');
  };

  const isAdminView = activeSection === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminAuthenticated && activeSection !== 'admin' && (
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      )}

      <main className={`flex-1 ${!isAdminView ? 'pt-0' : ''}`}>
        {activeSection === 'admin' ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="admin-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {isAdminAuthenticated ? (
                <AdminDashboard 
                  onLogout={handleAdminLogout} 
                  onBack={() => setActiveSection('home')}
                />
              ) : (
                <AdminLogin 
                  onLogin={handleAdminLogin} 
                  onBack={() => setActiveSection('home')}
                />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col">
            <section id="home" className="min-h-screen">
              <Hero setActiveSection={setActiveSection} />
              <PhotoLog />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </div>
        )}
      </main>

      {!isAdminView && <Footer setActiveSection={setActiveSection} />}
      {!isAdminView && <TelegramFloatingButton />}
    </div>
  );
}
