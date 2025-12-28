import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Eye, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const UPLOADS_URL = 'https://portfoliobackend-a6ah.onrender.com/uploads/';

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;

    // Base URL for the backend
    const BASE_URL = 'https://portfoliobackend-a6ah.onrender.com';

    // Remove leading slash
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;

    // If it already contains 'uploads/', just prepend base URL
    if (cleanPath.startsWith('uploads/')) {
      return `${BASE_URL}/${cleanPath}`;
    }

    // Otherwise prepend /uploads/
    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  const fetchProjects = async () => {
    try {
      // Use the production backend URL consistent with AdminLogin
      const response = await fetch('https://portfoliobackend-a6ah.onrender.com/api/projects');
      const data = await response.json();
      setProjects(data.filter(p => !p.isMini));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects(staticProjects);
      setLoading(false);
    }
  };

  const staticProjects = [
    {
      title: 'Association Union Management System',
      description: 'A comprehensive management system for student associations and unions. Features include member management, event coordination, and voting systems.',
      technologies: ['node js', 'Mongodb', 'React js', 'Express'],
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
      demoUrl: 'https://murti-guutoo-student-association-ze.vercel.app/',
      githubUrl: 'https://github.com',
      role: 'Full Stack Developer',
      featured: true
    },
    {
      title: 'Student Contact Management',
      description: 'Digital roster system for managing student information, contact details, and academic records.',
      technologies: ['php', 'mysql', 'javascript', 'html'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
      githubUrl: 'https://github.com',
      role: 'Solo Developer',
      featured: true
    }
  ];

  const featuredProjects = projects.filter(p => p.featured) || projects.slice(0, 3);

  return (
    <section className="section-padding container-custom">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Featured <span className="text-[var(--primary)]">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A collection of my recent works, ranging from small experiments to full-scale enterprise applications.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={scrollPrev} className="p-3 glass rounded-full hover:bg-[var(--primary)]/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onClick={scrollNext} className="p-3 glass rounded-full hover:bg-[var(--primary)]/10 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="embla overflow-hidden mb-20" ref={emblaRef}>
        <div className="embla__container flex">
          {featuredProjects.map((project, idx) => (
            <div key={idx} className="embla__slide flex-[0_0_100%] min-w-0 pr-6">
              <div className="glass-card overflow-hidden grid md:grid-cols-2 gap-8 p-6 md:p-10 group">
                <div className="relative overflow-hidden rounded-xl aspect-video md:aspect-auto">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 text-lg line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex gap-4 mt-auto">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2 text-sm">
                        <Github className="w-4 h-4" /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <h3 className="text-2xl font-bold mb-8">All Projects</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group glass-card overflow-hidden cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 glass rounded-full text-white">
                  <ExternalLink className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.slice(0, 2).map(tech => (
                  <span key={tech} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                {project.title}
              </h4>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--background)] max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-72 md:h-96">
                <img
                  src={getImageUrl(selectedProject.image)}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 glass rounded-full hover:bg-white/20 transition-colors text-white"
                >
                  <ArrowRight className="w-6 h-6 -rotate-90 md:rotate-0" />
                </button>
              </div>

              <div className="p-8 md:p-12 overflow-y-auto max-h-[50vh]">
                <h2 className="text-4xl font-black mb-6">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-xl bg-muted font-bold text-xs uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex gap-6">
                  {selectedProject.demoUrl && (
                    <a href={selectedProject.demoUrl} className="btn-primary flex items-center gap-3">
                      <Eye className="w-5 h-5" /> Live Preview
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} className="btn-outline flex items-center gap-3">
                      <Code className="w-5 h-5" /> View Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
