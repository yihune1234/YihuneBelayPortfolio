import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, Send, Rocket, Globe, Code2, Sparkles } from 'lucide-react';

export function Hero({ setActiveSection }) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-mesh">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-modern opacity-20 -z-10" />
      
      {/* Animated Background Blobs - Enhanced */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, -120, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10"
      />

      <div className="container-custom relative z-10 py-12 md:py-20 mt-16 md:mt-0">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card border-white/20 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-primary mb-10 shadow-2xl"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>Innovating Digital Frontiers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-foreground"
            >
              Crafting <br />
              <span className="animated-gradient-text">Exceptional</span> <br />
              Software.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground/80 mb-12 leading-relaxed max-w-2xl font-medium"
            >
              I am <span className="text-foreground font-bold">Yihune Belay</span>, a visionary architect of the digital web, specialized in building experiences that <span className="text-primary italic">inspire</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-16"
            >
              <button
                onClick={() => setActiveSection('projects')}
                className="btn-primary group !px-10 !py-5"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Portfolios <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              <a
                href="/resume.pdf"
                download="YIHUNE-BELAY-SEBSIBE.pdf"
                className="btn-outline !px-10 !py-5 flex items-center gap-3"
              >
                <Download size={20} />
                Get Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/yihune1234', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/yihune-belay-30b0a4383', label: 'LinkedIn' },
                { icon: Send, href: 'https://t.me/Y13bel', label: 'Telegram' }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, color: 'var(--primary)' }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 glass rounded-2xl hover:bg-primary/10 transition-all duration-300 border border-white/20 text-muted-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main Profile Card */}
            <div className="relative group animate-float">
              {/* Complex Glow Effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-[3rem] opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-700" />

              {/* Profile Image Container */}
              <div className="relative glass-card rounded-[3rem] p-4 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20" />
                <div className="overflow-hidden rounded-[2.5rem] border border-white/20">
                  <img
                    src="/images/profile.jpg"
                    alt="Yihune Belay"
                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>

                {/* Floating Info Overlays */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-8 right-8 glass p-5 rounded-[1.5rem] shadow-2xl border-white/30 backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Rocket className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                      <p className="font-black text-sm">Building Future Technology</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute top-12 left-8 glass p-5 rounded-[1.5rem] shadow-2xl border-white/30 backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                      <Globe className="text-green-500" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Based In</p>
                      <p className="font-black text-sm">Addis Ababa, ET</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Orbiting Icons */}
              <div className="absolute -top-10 -right-10 w-24 h-24 glass rounded-3xl flex items-center justify-center border-white/20 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                <Code2 className="text-primary" size={32} />
              </div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 glass rounded-3xl flex items-center justify-center border-white/20 shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
                <Sparkles className="text-purple-500" size={32} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Discover More</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}

