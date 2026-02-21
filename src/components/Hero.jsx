import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, Send, Rocket, Globe, Code2, Sparkles } from 'lucide-react';

export function Hero({ setActiveSection }) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-mesh">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-modern opacity-20 -z-10" />
      
      {/* Enhanced Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, -120, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-[120px] -z-10"
      />
      
      {/* Additional Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 bg-primary rounded-full -z-10"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}

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
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border-white/20 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-primary mb-10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-ping shadow-lg shadow-primary/50" />
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Innovating Digital Frontiers</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-foreground relative"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-20 blur-sm animate-pulse">Transforming</span>
              Transforming <br />
              <span className="animated-gradient-text relative z-10">Ideas Into</span> <br />
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent opacity-30 blur-md">Motion.</span>
                <span className="relative z-10">Reality.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground/80 mb-12 leading-relaxed max-w-2xl font-medium relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl -z-10" />
              I am <span className="text-foreground font-bold relative group">
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">Yihune Belay</span>
                <span className="relative z-10">Yihune Belay</span>
              </span>, a <span className="italic text-primary/80">visionary architect</span> of the digital web, specialized in <span className="font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">building experiences</span> that <span className="text-primary italic font-bold relative group">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">inspire</span>
                <span className="relative z-10">inspire</span>
              </span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-16"
            >
              <motion.button
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary group !px-10 !py-5 relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  <div className="relative">
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse" />
                  </div>
                  <span className="font-bold tracking-wide">Explore Portfolios</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 rounded-2xl" />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="YIHUNE-BELAY-SEBSIBE.pdf"
                className="btn-outline !px-10 !py-5 flex items-center gap-3 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="relative">
                    <Download className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="font-bold tracking-wide">Get Resume</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 rounded-2xl" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/yihune1234', label: 'GitHub', color: 'from-gray-600 to-gray-800', glow: 'shadow-gray-500/50' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/yihune-belay-30b0a4383', label: 'LinkedIn', color: 'from-blue-600 to-blue-800', glow: 'shadow-blue-500/50' },
                { icon: Send, href: 'https://t.me/Y13bel', label: 'Telegram', color: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/50' }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 glass rounded-2xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 transition-all duration-300 border border-white/20 text-muted-foreground relative overflow-hidden group"
                  aria-label={social.label}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className={`absolute -inset-1 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 rounded-2xl`} />
                  <div className="relative z-10">
                    <social.icon className="w-6 h-6 relative group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl" />
                  </div>
                  <div className={`absolute inset-0 ${social.glow} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl`} />
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
              {/* Enhanced Complex Glow Effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-[3rem] opacity-30 blur-[100px] group-hover:opacity-50 transition-opacity duration-700 animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-[3rem] opacity-20 blur-[60px] group-hover:opacity-40 transition-opacity duration-700" />

              {/* Profile Image Container */}
              <div className="relative glass-card rounded-[3rem] p-4 overflow-hidden shadow-2xl group-hover:shadow-[0_0_80px_rgba(var(--primary-rgb),0.3)] transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/30 group-hover:from-primary/40 group-hover:to-purple-500/40 transition-all duration-700" />
                <div className="overflow-hidden rounded-[2.5rem] border border-white/30 group-hover:border-white/40 transition-all duration-700">
                  <img
                    src="/images/profile.jpg"
                    alt="Yihune Belay"
                    className="w-full aspect-[4/5] object-cover hover:scale-110 transition-transform duration-1000 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Enhanced Floating Info Overlays */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="absolute bottom-8 right-8 glass p-5 rounded-[1.5rem] shadow-2xl border-white/30 backdrop-blur-2xl group-hover:border-white/40 group-hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-purple-500/40 transition-all duration-300">
                      <Rocket className="text-primary group-hover:rotate-12 transition-transform" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                      <p className="font-black text-sm bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Building Future Technology</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="absolute top-12 left-8 glass p-5 rounded-[1.5rem] shadow-2xl border-white/30 backdrop-blur-2xl group-hover:border-white/40 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center group-hover:from-green-500/40 group-hover:to-emerald-500/40 transition-all duration-300">
                      <Globe className="text-green-500 group-hover:rotate-12 transition-transform" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Based In</p>
                      <p className="font-black text-sm bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Addis Ababa, ET</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Floating Orbiting Icons */}
              <motion.div 
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-10 -right-10 w-24 h-24 glass rounded-3xl flex items-center justify-center border-white/30 shadow-2xl group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all duration-300"
                style={{ animationDelay: '1s' }}
              >
                <Code2 className="text-primary group-hover:rotate-180 transition-transform duration-500" size={32} />
              </motion.div>
              <motion.div 
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-10 -left-10 w-24 h-24 glass rounded-3xl flex items-center justify-center border-white/30 shadow-2xl group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
                style={{ animationDelay: '2s' }}
              >
                <Sparkles className="text-purple-500 group-hover:rotate-180 transition-transform duration-500" size={32} />
              </motion.div>
              
              {/* Additional floating elements */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary/20 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1.4, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-purple-500/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 group cursor-pointer"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors duration-300">Discover More</span>
        <div className="relative">
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
          />
          <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>
    </section>
  );
}

