import { Code, Palette, Zap, ChevronDown, Terminal, Layers, Rocket, Download, Mail, FolderGit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';
import { useState, useEffect } from 'react';

export function Hero({ setActiveSection }) {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Yihune Belay';

  useEffect(() => {
    setDisplayedText(fullText);
  }, []);

  const cards = [
    {
      icon: Terminal,
      title: 'Full Stack Development',
      description: 'End-to-end web application development',
    },
    {
      icon: Layers,
      title: 'System Design',
      description: 'Scalable architecture and solutions',
    },
    {
      icon: Rocket,
      title: 'Problem Solving',
      description: 'Innovative solutions to complex challenges',
    },
  ];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <ImageWithFallback
                  src="/images/yihune .jpg"
                  alt="Yihune Belay - Profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-blue-400 -z-10 blur-xl"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <h1 className="mb-4" style={{ color: 'var(--text)' }}>
            Hello, I'm{' '}
            <span className="title inline-block">{displayedText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block ml-1"
              style={{ color: 'var(--text)' }}
            >
              |
            </motion.span>
          </h1>
          <h3 className="text-slate-700 mb-4">Software Engineering Student & Full Stack Developer</h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Hi, I'm <span className="text-blue-600">Yihune</span> — a 4th-year Software Engineering student at Haramaya University with a deep passion for building things that matter. I don't just write code — I craft experiences, solve problems, and bring ideas to life through technology.
          </p>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => setActiveSection('projects')}
              className="btn inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <FolderGit2 size={20} />
              <span>View Projects</span>
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className="btn inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </button>
            <a
              href="/YIHUNE-BELAY-SEBSIBE.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl border-2 border-slate-200 bg-white text-slate-800"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="card"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.15 + 0.3,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                >
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
                <h3 className="text-slate-800 mb-2">{card.title}</h3>
                <p className="text-slate-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => setActiveSection('about')}
          className="mx-auto block text-slate-600 hover:text-blue-600 transition-colors animate-bounce"
          aria-label="Go to about section"
        >
          <ChevronDown size={32} />
        </motion.button>
      </div>
    </section>
  );
}
