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
    <section className="section-padding container-custom">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image and Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative lg:sticky lg:top-24"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)] to-purple-500 rounded-2xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
            <img
              src="/images/yihune .jpg"
              alt="Yihune Belay - Full Stack Developer"
              className="relative rounded-2xl w-full aspect-square object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-4 text-center"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-[var(--primary)]" />
                <div className="text-xl font-black">{stat.value}</div>
                <div className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Competencies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass-card p-6 rounded-2xl"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-3">
              {coreCompetencies.map((comp, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors"
                >
                  <comp.icon size={16} className="text-[var(--primary)]" />
                  <span className="text-xs font-medium">{comp.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Description and Skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* About Me Header */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-4"
            >
              About <span className="text-[var(--primary)]">Me</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Passionate and driven <span className="font-bold text-foreground">4th-year Software Engineering student</span> with expertise in full-stack web development and a proven track record of building modern, responsive applications. Specializing in React, Node.js, and database management with strong problem-solving abilities and a collaborative mindset.
            </motion.p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Technical Skills</h3>

            {skillCategories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: catIdx * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold">{category.title}</h4>
                </div>

                {/* Skills Grid */}
                <div className="grid gap-3 pl-4 border-l-2 border-[var(--border)]">
                  {category.skills.map((skill, skillIdx) => {
                    const levelInfo = getLevelIndicator(skill.level);
                    return (
                      <motion.div
                        key={skillIdx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 }}
                        whileHover={{ x: 5, backgroundColor: 'var(--muted)' }}
                        className="p-4 rounded-xl glass transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-bold text-sm">{skill.name}</h5>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${levelInfo.color} text-white font-bold uppercase tracking-wider`}>
                                {levelInfo.label}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {skill.description}
                            </p>
                          </div>
                        </div>

                        {/* Visual Level Indicator - Dots */}
                        <div className="flex items-center gap-1 mt-3">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 + i * 0.05 }}
                              className={`h-1.5 flex-1 rounded-full ${i < levelInfo.dots ? levelInfo.color : 'bg-muted'
                                }`}
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

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-6"
          >
            <div className="glass-card p-6 rounded-2xl border-2 border-[var(--primary)]/20">
              <p className="text-sm text-muted-foreground italic">
                "I believe in writing clean, maintainable code and staying ahead of the curve. My approach combines creative design with robust engineering to deliver exceptional user experiences."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
