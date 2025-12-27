import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, ArrowRight, Sparkles, Code2, Rocket, Globe, Download } from 'lucide-react';

export function Hero({ setActiveSection }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient -z-10" />
      <div className="absolute inset-0 bg-grid -z-10 opacity-30" />

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-card text-xs font-bold tracking-widest uppercase text-[var(--primary)] mb-8 border border-[var(--primary)]/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Globe size={16} className="text-[var(--primary)]" />
              </motion.div>
              <Sparkles size={14} className="animate-pulse" />
              Welcome to my creative space
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight"
            >
              I build digital <br />
              <span className="animated-gradient-text uppercase">experiences</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl"
            >
              Full-stack developer specialized in building modern, scalable, and user-centric web applications with latest technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={() => setActiveSection('projects')}
                className="btn-primary flex items-center gap-2 group relative overflow-hidden px-6 py-4 rounded-2xl"
              >
                <Rocket size={18} />
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>

              <a
                href="/resume.pdf"
                download="YIHUNE-BELAY-SEBSIBE.pdf"
                className="btn-outline flex items-center gap-2 px-6 py-4 rounded-2xl glass-card border-[3px]"
              >
                <Download size={18} />
                Download CV
              </a>

              <button
                onClick={() => setActiveSection('contact')}
                className="p-4 glass-card rounded-2xl hover:bg-muted transition-colors flex items-center justify-center border border-white/10"
                title="Get In Touch"
              >
                <Code2 size={20} className="text-[var(--primary)]" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-5"
            >
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 8, backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 glass-card rounded-2xl hover:text-[var(--primary)] transition-all duration-300 border border-white/10"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main Profile Card */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)] via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-3xl group-hover:opacity-50 transition-opacity duration-500" />

              {/* Profile Image Container */}
              <div className="relative glass-card rounded-3xl p-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-purple-500/10" />
                <img
                  src="/images/profile.jpg"
                  alt="Yihune Belay"
                  className="relative rounded-2xl w-full aspect-[3/4] object-cover shadow-2xl"
                />

                {/* Overlay Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div>
                      <p className="font-bold text-sm">Available for Projects</p>
                      <p className="text-xs text-muted-foreground">Let's build something amazing</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Card 2 - Bottom Left */}
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">3+ Years</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Logo Card - Top Left */}
            <motion.div
              animate={{
                y: [0, -25, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-12 -left-12 glass-card p-4 rounded-3xl shadow-2xl hidden lg:block z-20 border-2 border-[var(--primary)]/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent group-hover:opacity-100 transition-opacity" />
              <img src="/images/logo.png" alt="Logo" className="w-16 h-16 object-contain relative z-10 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-24 -left-20 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-24 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] -z-10"
      />
    </section>
  );
}
