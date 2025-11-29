import { motion } from 'motion/react';
import { ExternalLink, Github, Users, Contact, Calendar, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';

export function Projects({ setActiveSection }) {
  const projects = [
    {
      title: 'Association Union Management System',
      description: 'A comprehensive management system for student associations and unions. Features include member management, event coordination, voting systems, and financial tracking.',
      technologies: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      icon: Users,
      image: '/images/murtiguto.png',
      demoUrl: 'https://murti-guutoo-student-association-ze.vercel.app/',
      githubUrl: '',
      role: 'Full Stack Developer (Team Project)',
    },
    {
      title: 'Student Contact & Roster Management',
      description: 'Digital roster system for managing student information, contact details, attendance tracking, and academic records with an intuitive admin dashboard.',
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'React.js'],
      icon: Contact,
      image: '/images/Student Contact Management System.png',
    
      githubUrl: 'https://github.com/yihune1234/Health-Center-Management-System',
      role: 'Solo Developer',
    },
    {
      title: 'Event Management Platform',
      description: 'Complete event planning and management solution with registration, ticketing, scheduling, and real-time notifications for attendees and organizers.',
      technologies: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
      icon: Calendar,
      image: '/images/Event Management System.png',
   
      githubUrl: 'https://github.com/yihune1234/Event-Management-System',
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing projects, skills, and professional experience. Built with modern web technologies and smooth animations.',
      technologies: ['React.js', 'Tailwind CSS', 'Motion', 'TypeScript'],
      icon: Globe,
      image: '/images/Student Roster Management.png',
    
      githubUrl: 'https://github.com/yihune1234/Roster-Management-System',
      role: 'Solo Developer',
    },
  ];

  const miniProjects = [
    {
      name: 'Task Manager App',
      tech: ['React', 'LocalStorage'],
      description: 'Interactive to-do list with task categorization and priority levels',
    },
    {
      name: 'Authentication System',
      tech: ['Node.js', 'JWT', 'MongoDB'],
      description: 'Secure user authentication with JWT tokens and password hashing',
    },
    {
      name: 'Blog CMS',
      tech: ['PHP', 'MySQL'],
      description: 'Content management system for creating and publishing blog posts',
    },
    {
      name: 'Real-time Chat',
      tech: ['Socket.io', 'Express'],
      description: 'Live messaging application with real-time communication',
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
          <h2 className="title mb-4">My Projects</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ background: 'var(--primary)' }}></div>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Here are some of the projects I've built that showcase my skills in full-stack development, 
            problem-solving, and creating practical solutions to real-world challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card overflow-hidden transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-800 mb-2">{project.title}</h3>
                    <p className="text-slate-600 mb-3">{project.description}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-2">Technologies Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ background: 'color-mix(in oklab, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-slate-100">
                  <p className="text-sm text-slate-600">
                    <span className="text-slate-800">Role:</span> {project.role}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-slate-800 text-center mb-8">Mini Projects & Experiments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {miniProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <h4 className="text-slate-800 mb-2">{project.name}</h4>
                <p className="text-slate-600 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs"
                      style={{ background: 'color-mix(in oklab, var(--primary) 8%, transparent)', color: 'var(--text)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
