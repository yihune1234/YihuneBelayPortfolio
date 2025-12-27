import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, X, Upload, ExternalLink, FolderKanban, Sparkles } from 'lucide-react';

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
      setImagePreview(project.image ? `https://portfoliobackend-a6ah.onrender.com${project.image}` : null);
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

  const totalProjects = projects.length;
  const mainProjects = projects.filter(p => !p.isMini).length;
  const miniProjects = projects.filter(p => p.isMini).length;

  return (
    <div>
      {/* Hero */}
      <div className="admin-hero-card">
        <div>
          <p className="text-sm text-white/80 mb-1">Project Dashboard</p>
          <h2 className="admin-hero-title">Manage your workflow with clarity and focus.</h2>
          <p className="text-white/80">Create, track, and refine every showcase from one clean view.</p>
        </div>
        <button onClick={() => openModal()} className="admin-hero-cta">
          <Plus className="w-5 h-5" />
          Create New Project
        </button>
      </div>

      {/* Active summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Active Projects</h3>
          <p className="text-slate-600 dark:text-slate-400">You have {totalProjects} active project{totalProjects !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2 text-sm text-slate-500 dark:text-slate-300">
          <span className="pill pill-soft">{mainProjects} Main</span>
          <span className="pill pill-soft">{miniProjects} Mini</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="admin-project-card"
          >
            {project.image && (
              <div className="relative h-40 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                <img
                  src={`https://portfoliobackend-a6ah.onrender.com${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-400"
                />
                {project.isMini && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/80 text-slate-800 text-xs font-semibold rounded-full shadow-md">
                    Mini
                  </div>
                )}
              </div>
            )}
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <FolderKanban className="w-4 h-4" /> {project.role || 'Project'}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 line-clamp-1">{project.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">{project.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
              {project.technologies.length > 3 && (
                <span className="tag subtle">+{project.technologies.length - 3}</span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => openModal(project)}
                className="ghost-btn"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="ghost-btn danger"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-3xl my-8 shadow-2xl flex flex-col admin-modal"
          >
            {/* Modal Header - Fixed */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  {editingProject ? <Edit className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <p className="text-blue-100 text-sm">Fill in the project details below</p>
                </div>
              </div>
              <button 
                onClick={closeModal} 
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="p-6 space-y-5 admin-modal-body">
                
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., E-commerce Platform"
                    required
                    maxLength={100}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {formData.title.length}/100 characters
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    rows="4"
                    placeholder="Describe your project, its features, and what makes it unique..."
                    required
                    maxLength={500}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Technologies <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="React, Node.js, MongoDB, Tailwind CSS"
                    required
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Separate technologies with commas
                  </p>
                </div>

                {/* Your Role */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Full Stack Developer, Frontend Developer, etc."
                  />
                </div>

                {/* URLs Section */}
                <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Project Links
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="https://github.com/username/repository"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="https://your-project-demo.com"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl cursor-pointer hover:shadow-md transition border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-700">
                    <input
                      type="checkbox"
                      checked={formData.isMini}
                      onChange={(e) => setFormData({ ...formData, isMini: e.target.checked })}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
                          Mini Project
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Mark this as a smaller side project or experiment
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Project Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border-2 border-slate-200 dark:border-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, image: null });
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <label
                        htmlFor="image-upload"
                        className="absolute bottom-2 right-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-lg cursor-pointer font-medium text-sm"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center gap-3 w-full px-4 py-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition group"
                    >
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Click to upload project image
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </label>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                </div>
              </div>

              {/* Modal Footer - Fixed at Bottom */}
              <div className="flex gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--primary)' }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingProject ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
