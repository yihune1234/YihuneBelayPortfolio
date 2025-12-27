import { motion } from 'motion/react';
import { Code2, Database, Smartphone, Users, Lightbulb, Target, Server, Layout, GitBranch, GraduationCap, Briefcase } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';

export function About({ setActiveSection }) {
  const skillCategories = [
    {
      category: 'Backend Development',
      icon: Server,
      skills: ['PHP', 'Node.js', 'Express.js'],
    },
    {
      category: 'Frontend Development',
      icon: Layout,
      skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'React.js'],
    },
    {
      category: 'Database Management',
      icon: Database,
      skills: ['SQL', 'MySQL', 'MongoDB'],
    },
    {
      category: 'Tools & DevOps',
      icon: GitBranch,
      skills: ['Git & GitHub', 'VS Code', 'Postman'],
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
          <h2 className="title mb-4">About Me</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ background: 'var(--primary)' }}></div>
        </motion.div>

        {/* About Content with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-slate-800 mb-4">Software Engineering Student & Full Stack Developer</h3>
            <p className="text-slate-600 mb-6">
              Hi, I'm <span className="text-blue-600">Yihune</span> — a 4th-year Software Engineering student at Haramaya University with a deep passion for building things that matter. I don't just write code — I craft experiences, solve problems, and bring ideas to life through technology.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Code2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-slate-800 mb-1">Web Development</h4>
                  <p className="text-slate-600">Building responsive, user-centric web applications with modern technologies</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-slate-800 mb-1">Full Stack Expertise</h4>
                  <p className="text-slate-600">From database design to frontend interfaces, I handle the complete development cycle</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-slate-800 mb-1">Problem Solving</h4>
                  <p className="text-slate-600">Analytical approach to breaking down complex problems into elegant solutions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-slate-800 mb-1">System Design</h4>
                  <p className="text-slate-600">Creating scalable architectures and efficient system solutions</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <ImageWithFallback
                src="/images/image.png"
                alt="Developer workspace"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-slate-800 text-center mb-8">Education</h3>
          <div className="max-w-3xl mx-auto card">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-800 mb-2">B.Sc. in Software Engineering</h4>
                <p className="text-slate-700 mb-3">Haramaya University | Expected 2025</p>
                <p className="text-slate-600 mb-3">
                  Specialized in software development, system design, and modern programming paradigms. 
                  Focused on building practical solutions to real-world problems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white text-slate-700 rounded-full text-sm">Software Architecture</span>
                  <span className="px-3 py-1 bg-white text-slate-700 rounded-full text-sm">Database Systems</span>
                  <span className="px-3 py-1 bg-white text-slate-700 rounded-full text-sm">Web Engineering</span>
                  <span className="px-3 py-1 bg-white text-slate-700 rounded-full text-sm">Algorithm Design</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-slate-800 text-center mb-12"
          >
            Technical Skills
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-slate-800">{category.category}</h4>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center text-slate-700"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
