import { motion } from 'motion/react';
import { Code2, Briefcase, Award, Database, Layout, Server, Globe, GitBranch, Palette, Terminal, Boxes, Zap } from 'lucide-react';

export function About() {
  const stats = [
    { label: 'Year Student', value: '4th', icon: Briefcase },
    { label: 'Tech Stack', value: 'Full-Stack', icon: Code2 }
  ];

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Layout,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', description: 'Dynamic UIs and component-based architecture', level: 'expert' },
        { name: 'JavaScript', description: 'Core logic and interactivity implementation', level: 'expert' },
        { name: 'Tailwind CSS', description: 'Utility-first styling for rapid design', level: 'advanced' },
        { name: 'Bootstrap', description: 'Responsive layouts with prebuilt components', level: 'advanced' },
        { name: 'HTML/CSS', description: 'Semantic structure and custom styling', level: 'expert' }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', description: 'JavaScript runtime for server-side logic', level: 'advanced' },
        { name: 'Express.js', description: 'RESTful API development and routing', level: 'advanced' },
        { name: 'PHP', description: 'Lightweight scripting and legacy integration', level: 'intermediate' }
      ]
    },
    {
      title: 'Database Management',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'MySQL', description: 'Relational database management and optimization', level: 'advanced' },
        { name: 'MongoDB', description: 'NoSQL database for flexible data modeling', level: 'advanced' }
      ]
    },
    {
      title: 'Development Tools',
      icon: Terminal,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git & GitHub', description: 'Version control and collaborative development', level: 'advanced' },
        { name: 'REST APIs', description: 'Data exchange and system integration', level: 'advanced' },
        { name: 'VS Code', description: 'Advanced development environment utilization', level: 'expert' }
      ]
    }
  ];

  const coreCompetencies = [
    { name: 'Full-stack Development', icon: Boxes },
    { name: 'Problem-solving', icon: Zap },
    { name: 'Team Collaboration', icon: GitBranch },
    { name: 'Analytical Thinking', icon: Code2 }
  ];

  const getLevelIndicator = (level) => {
    const levels = {
      expert: { dots: 4, color: 'bg-green-500', label: 'Expert' },
      advanced: { dots: 3, color: 'bg-blue-500', label: 'Advanced' },
      intermediate: { dots: 2, color: 'bg-yellow-500', label: 'Intermediate' }
    };
    return levels[level] || levels.intermediate;
  };

  return (
    <section className="section-padding container-custom relative">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* Left: Image and Bio */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative lg:sticky lg:top-32"
        >
          <div className="relative group perspective-1000">
            <div className="absolute -inset-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-[2.5rem] opacity-20 blur-[60px] group-hover:opacity-40 transition-opacity duration-700" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
              <img
                src="/images/profile.jpg"
                alt="Yihune Belay"
                className="w-full aspect-[4/5] object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Experience Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-8 glass-card p-6 border-white/30 backdrop-blur-3xl rounded-[2rem] shadow-2xl"
            >
        
            
            </motion.div>
          </div>

          {/* Core Competencies Grid */}
          <div className="mt-20 grid grid-cols-2 gap-4">
            {coreCompetencies.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-5 border-white/10 flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                  <comp.icon size={20} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{comp.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Description and Skills */}
        <div className="space-y-16">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black tracking-tighter"
            >
              The <span className="text-gradient">Architect.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                Driven by a relentless pursuit of <span className="text-foreground font-black italic">elegance</span> in code and <span className="text-primary font-black">sophistication</span> in design.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a senior Software Engineering student, I transcend traditional development boundaries to build complex digital ecosystems. My approach harmonizes robust backend logic with haute-couture frontend experiences.
              </p>
            </motion.div>
          </div>

          {/* Enhanced Skills Catalog */}
          <div className="space-y-10">
            <h3 className="text-3xl font-black tracking-tight">Technical Arsenal</h3>

            <div className="grid gap-8">
              {skillCategories.map((category, catIdx) => (
                <motion.div
                  key={catIdx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight">{category.title}</h4>
                  </div>

                  <div className="grid gap-4">
                    {category.skills.map((skill, skillIdx) => {
                      const levelInfo = getLevelIndicator(skill.level);
                      return (
                        <motion.div
                          key={skillIdx}
                          whileHover={{ x: 10 }}
                          className="glass-card p-6 border-white/10 group transition-all duration-500"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <h5 className="font-black text-lg tracking-tight group-hover:text-primary transition-colors">{skill.name}</h5>
                              <span className={`text-[8px] px-3 py-1 rounded-full ${levelInfo.color} text-white font-black uppercase tracking-[0.2em]`}>
                                {levelInfo.label}
                              </span>
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Expertise Verified</span>
                          </div>
                          <p className="text-sm text-muted-foreground font-medium mb-6 leading-relaxed">
                            {skill.description}
                          </p>
                          <div className="flex gap-2">
                            {[...Array(4)].map((_, i) => (
                              <div 
                                key={i} 
                                className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${i < levelInfo.dots ? levelInfo.color : 'bg-muted/10'}`} 
                                style={{ transitionDelay: `${i * 100}ms` }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
