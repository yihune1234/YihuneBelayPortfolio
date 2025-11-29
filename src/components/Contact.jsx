import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export function Contact({ setActiveSection }) {
  const socialLinks = [
    {
      name: 'Telegram',
      icon: Send,
      url: 'https://t.me/Y13bel',
      color: 'hover:text-[#0088cc]',
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:yihunebelay859@gmail.com',
      color: 'hover:text-red-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/yihune-belay-30b0a4383',
      color: 'hover:text-[#0077b5]',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/yihune1234',
      color: 'hover:text-slate-900',
    },
  ];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="title mb-4">Get In Touch</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ background: 'var(--primary)' }}></div>
          <p className="text-slate-600 max-w-3xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision. Feel free to reach out through any of my social
            channels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`card flex flex-col items-center justify-center p-6 transition-all ${link.color}`}
              >
                <link.icon className="w-8 h-8 mb-3" />
                <span className="text-slate-700">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-600 mb-6">
              Prefer a direct message? Click the button below to connect with me on Telegram.
            </p>
            <a
              href="https://t.me/Y13bel"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 px-8 py-3"
            >
              <Send size={20} />
              <span>Message on Telegram</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center text-slate-500"
        >
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}
