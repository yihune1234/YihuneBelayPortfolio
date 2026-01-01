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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl leading-relaxed"
          >
            A curated selection of my digital masterpieces, blending innovative technology with elegant design.
          </motion.p>
        </div>

        <div className="flex gap-4">
          <button onClick={scrollPrev} className="p-4 glass rounded-2xl hover:bg-[var(--primary)] hover:text-white transition-all shadow-lg hover:shadow-primary/20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button onClick={scrollNext} className="p-4 glass rounded-2xl hover:bg-[var(--primary)] hover:text-white transition-all shadow-lg hover:shadow-primary/20">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="embla overflow-hidden mb-32" ref={emblaRef}>
        <div className="embla__container flex">
          {featuredProjects.map((project, idx) => (
            <div key={idx} className="embla__slide flex-[0_0_100%] min-w-0 pr-6">
              <div className="glass-card overflow-hidden grid lg:grid-cols-2 gap-10 p-8 md:p-12 group relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="relative img-hover-scale aspect-video lg:aspect-auto shadow-2xl">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex flex-col justify-center relative z-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6 group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-10 text-lg leading-relaxed line-clamp-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-auto">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-3">
                        <Eye className="w-5 h-5" /> Live Experience
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-3">
                        <Github className="w-5 h-5" /> Source Code
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
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-3xl font-black tracking-tight">Archive & Explorations</h3>
        <div className="h-px flex-1 bg-border mx-8 hidden md:block" />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group glass-card flex flex-col h-full cursor-pointer hover:-translate-y-3 transition-all duration-500"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative aspect-[16/10] img-hover-scale m-4 mb-0">
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <div className="p-4 glass rounded-2xl text-primary scale-90 group-hover:scale-100 transition-transform">
                  <ExternalLink className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 2).map(tech => (
                  <span key={tech} className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                    {tech}
                  </span>
                ))}
              </div>
              <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h4>
              <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-border flex items-center text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                View Project Details <ArrowRight className="w-4 h-4 ml-2" />
              </div>
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
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-background max-w-6xl w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col md:flex-row h-fit max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-3/5 relative group h-64 md:h-auto overflow-hidden">
                <img
                  src={getImageUrl(selectedProject.image)}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
              </div>

              <div className="md:w-2/5 p-8 md:p-14 overflow-y-auto bg-mesh">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 p-3 glass rounded-2xl hover:bg-primary hover:text-white transition-all z-10"
                >
                  <ArrowRight className="w-6 h-6 -rotate-90 md:rotate-0" />
                </button>

                <div className="mb-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{selectedProject.title}</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="grid gap-6">
                  {selectedProject.demoUrl && (
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center gap-3">
                      <Eye className="w-6 h-6" /> Explore Live Project
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full flex items-center justify-center gap-3">
                      <Code className="w-6 h-6" /> Explore Source Code
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
