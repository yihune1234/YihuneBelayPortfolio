import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Projects } from './components/Projects.jsx';
import { Contact } from './components/Contact.jsx';
import { TelegramFloatingButton } from './components/TelegramFloatingButton.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    const sections = {
      home: <Hero setActiveSection={setActiveSection} />,
      about: <About setActiveSection={setActiveSection} />,
      projects: <Projects setActiveSection={setActiveSection} />,
      contact: <Contact setActiveSection={setActiveSection} />
    };
    return sections[activeSection] || sections.home;
  };

  return (
    <div className="min-h-screen">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 md:pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
           
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
            className="w-full max-w-7xl mx-auto"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      <TelegramFloatingButton />
    </div>
  );
}
