import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Users, Contact, Calendar, Globe, FolderKanban, X, Maximize2, Code, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback.jsx';

export function Projects({ setActiveSection }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('loading'); // api | static | loading
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all'); // all | frontend | backend | fullstack

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/projects');
      const data = await response.json();
      setProjects(data.filter(p => !p.isMini));
      setDataSource('api');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to static data if API fails
      setProjects(staticProjects);
      setDataSource('static');
      setLoading(false);
    }
  };

  const staticProjects = [
    {
      title: 'Association Union Management System',
      description: 'A comprehensive management system for student associations and unions. Features include member management, event coordination, voting systems, and financial tracking.',
      technologies: ['node js', 'Mongodb', 'Bootstrap', 'JavaScript','react js'],
      icon: Users,
      image: '/images/murtiguto.png',
      demoUrl: 'https://murti-guutoo-student-association-ze.vercel.app/',
      githubUrl: '',
      role: 'Full Stack Developer (Team Project)',
    },
    {
      title: 'Student Contact & Roster Management',
      description: 'Digital roster system for managing student information, contact details, attendance tracking, and academic records with an intuitive admin dashboard.',
      technologies: ['php', 'javascitp', 'mysql', 'html','css'],
      icon: Contact,
      image: '/images/Student Contact Management System.png',
    
      githubUrl: 'https://github.com/yihune1234/Health-Center-Management-System',
      role: 'Solo Developer',
    },
    {
      title: 'Event Management Platform',
      description: 'Complete event planning and management solution with registration, ticketing, scheduling, and real-time notifications for attendees and organizers.',
      technologies: ['Html', ,'javascript','php', 'MySQL', 'Tailwind CSS'],
      icon: Calendar,
      image: '/images/Event Management System.png',
   
      githubUrl: 'https://github.com/yihune1234/Event-Management-System',
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing projects, skills, and professional experience. Built with modern web technologies and smooth animations.',
      technologies: ['React.js', 'Tailwind CSS', 'Motion', 'javascript'],
      icon: Globe,
      image: 'images/image copy.png',
    
      githubUrl: 'https://github.com/yihune1234/YihuneBelayPortfolio',
      role: 'Solo Developer',
    },
    {
  title: 'Event Management Platform Basic',
  description: 'A lightweight and fully functional event management system built with pure Node.js and Express. Allows users to create, view, edit, and delete events through a clean RESTful API and responsive web interface.',
  technologies: ['Node.js', 'Express.js', 'JavaScript', 'HTML5', 'CSS3', 'EJS'],
  icon: Calendar,
  image: 'images/image_2025-12-02_01-30-21.jpg',
  githubUrl: 'https://github.com/yihune1234/CodVeda-Level1-Project-Internship-/tree/backend',
  liveUrl: 'https://yihune1234.github.io/CodVeda-Level1-Project-Internship-/index.html', // optional
  role: 'Full-Stack Developer',
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
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <p className="text-slate-600 max-w-3xl">
              Full-stack builds powered by the existing Express backend. Data loads live from <code className="badge">/api/projects</code> with automatic static fallback.
            </p>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                dataSource === 'api'
                  ? 'bg-emerald-50 text-emerald-700'
                  : dataSource === 'static'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full"
                style={{
                  background:
                    dataSource === 'api'
                      ? '#10b981'
                      : dataSource === 'static'
                      ? '#f59e0b'
                      : '#94a3b8',
                }}
              ></span>
              {dataSource === 'api' && 'Live from backend'}
              {dataSource === 'static' && 'Offline fallback data'}
              {dataSource === 'loading' && 'Checking backend...'}
            </span>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="card skeleton-card h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card overflow-hidden transition-all duration-300 group project-card relative"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedProject(project)}>
                <ImageWithFallback
                  src={project.image?.startsWith('/uploads') ? `http://localhost:5001${project.image}` : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="flex gap-3"
                  >
                    <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <Maximize2 className="w-5 h-5 text-slate-800" />
                    </button>
                  </motion.div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ background: 'var(--primary)' }}
                  >
                    {project.icon ? <project.icon className="w-6 h-6 text-white" /> : <FolderKanban className="w-6 h-6 text-white" />}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-slate-800 dark:text-slate-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{project.description}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-semibold">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                        style={{ background: 'color-mix(in oklab, var(--primary) 15%, transparent)', color: 'var(--primary)' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">Role:</span> {project.role}
                  </p>
                </div>
                
                <div className="flex gap-3 flex-wrap items-center">
                  {project.demoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                      style={{ background: 'var(--primary)' }}
                    >
                      <Eye size={18} />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {project.liveUrl && !project.demoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                      style={{ background: 'var(--primary)' }}
                    >
                      <Eye size={18} />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-700 text-white font-medium shadow-md hover:shadow-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-all"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Mini Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-slate-800 dark:text-slate-100 text-center mb-8">Mini Projects & Experiments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {miniProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                className="card"
              >
                <h4 className="text-slate-800 dark:text-slate-100 mb-2">{project.name}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{project.description}</p>
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

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header with Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <ImageWithFallback
                    src={selectedProject.image?.startsWith('/uploads') ? `http://localhost:5001${selectedProject.image}` : selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <p className="text-white/90 text-sm">{selectedProject.role}</p>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">About This Project</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                          style={{ background: 'color-mix(in oklab, var(--primary) 15%, transparent)', color: 'var(--primary)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap pt-4 border-t border-slate-200 dark:border-slate-700">
                    {selectedProject.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        style={{ background: 'var(--primary)' }}
                      >
                        <Eye size={20} />
                        <span>View Live Demo</span>
                      </motion.a>
                    )}
                    {selectedProject.liveUrl && !selectedProject.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        style={{ background: 'var(--primary)' }}
                      >
                        <Eye size={20} />
                        <span>View Live Demo</span>
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-all"
                      >
                        <Code size={20} />
                        <span>View Source Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
