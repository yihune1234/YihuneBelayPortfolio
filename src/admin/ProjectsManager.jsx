import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, X, Upload, ExternalLink, FolderKanban, Sparkles, Globe, Github } from 'lucide-react';
import CloudinaryImage from '../components/CloudinaryImage.jsx';

export function ProjectsManager({ showAddProject, setShowAddProject }) {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    demoUrl: '',
    role: 'Developer',
    isMini: false,
    image: null
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('data:')) return imagePath; // For local previews
    
    // If it's already a Cloudinary URL, return as is
    if (imagePath.startsWith('http') && imagePath.includes('res.cloudinary.com')) {
      return imagePath;
    }

    let originalUrl = imagePath;
    if (!imagePath.startsWith('http')) {
      const BASE_URL = 'https://portfoliobackend-a6ah.onrender.com';
      const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      if (cleanPath.startsWith('uploads/')) {
        originalUrl = `${BASE_URL}/${cleanPath}`;
      } else {
        originalUrl = `${BASE_URL}/uploads/${cleanPath}`;
      }
    }

    // Wrap in Cloudinary Fetch for automatic optimization
    return `https://res.cloudinary.com/dqcrqtzz6/image/fetch/f_auto,q_auto/${originalUrl}`;
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (showAddProject) {
      openModal();
      setShowAddProject(false);
    }
  }, [showAddProject, setShowAddProject]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://portfoliobackend-a6ah.onrender.com/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('adminToken');
    const formDataToSend = new FormData();

    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim())));
    formDataToSend.append('githubUrl', formData.githubUrl);
    formDataToSend.append('demoUrl', formData.demoUrl);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('isMini', formData.isMini);

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const url = editingProject
        ? `https://portfoliobackend-a6ah.onrender.com/api/projects/${editingProject._id}`
        : 'https://portfoliobackend-a6ah.onrender.com/api/projects';

      const response = await fetch(url, {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

      if (response.ok) {
        fetchProjects();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`https://portfoliobackend-a6ah.onrender.com/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        githubUrl: project.githubUrl || '',
        demoUrl: project.demoUrl || '',
        role: project.role || 'Developer',
        isMini: project.isMini || false,
        image: null
      });
      setImagePreview(project.image ? getImageUrl(project.image) : null);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        demoUrl: '',
        role: 'Developer',
        isMini: false,
        image: null
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black mb-1">Project Management</h2>
          <p className="text-muted-foreground">You have {projects.length} active projects in your portfolio.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Create New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card group flex flex-col h-full"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
              <CloudinaryImage
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                width={800}
                height={450}
              />
              {project.isMini && (
                <div className="absolute top-3 right-3 px-2 py-1 glass rounded-lg text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                  Mini
                </div>
              )}
            </div>

            <div className="p-2 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
                <FolderKanban size={14} /> {project.role}
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{project.description}</p>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => openModal(project)}
                  className="flex-1 p-3 glass rounded-xl hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-bold"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-3 glass rounded-xl hover:bg-red-500 hover:text-white transition-all text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--background)] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-2xl font-black">{editingProject ? 'Edit Project' : 'New Project'}</h3>
                <button onClick={closeModal} className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 max-h-[70vh] overflow-y-auto space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 glass rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-bold"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                  <textarea
                    required
                    rows="4"
                    className="w-full px-5 py-4 glass rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 glass rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-bold"
                    placeholder="React, tailwind, node..."
                    value={formData.technologies}
                    onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Github URL</label>
                    <input
                      type="url"
                      className="w-full px-5 py-4 glass rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      value={formData.githubUrl}
                      onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Demo URL</label>
                    <input
                      type="url"
                      className="w-full px-5 py-4 glass rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      value={formData.demoUrl}
                      onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                  <input
                    type="checkbox"
                    id="isMini"
                    className="w-5 h-5 accent-[var(--primary)]"
                    checked={formData.isMini}
                    onChange={e => setFormData({ ...formData, isMini: e.target.checked })}
                  />
                  <label htmlFor="isMini" className="text-sm font-bold uppercase tracking-widest cursor-pointer select-none">Mark as Mini Project</label>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Project Banner</label>
                  {imagePreview ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--primary)]/20">
                      <CloudinaryImage 
                        src={imagePreview} 
                        className="w-full h-full object-cover" 
                        width={1000} 
                        height={600} 
                      />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(null); setFormData({ ...formData, image: null }); }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center py-10 glass rounded-3xl border-2 border-dashed border-white/20 cursor-pointer hover:bg-white/5 transition-colors">
                      <Upload size={32} className="text-muted-foreground mb-4" />
                      <span className="font-bold text-sm">Click to upload banner image</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>

                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={closeModal} className="flex-1 btn-outline">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-1 btn-primary">
                    {loading ? 'Processing...' : (editingProject ? 'Update Project' : 'Publish Project')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
