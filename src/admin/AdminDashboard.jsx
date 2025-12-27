import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogOut, FolderKanban, MessageSquare, Settings, Plus, LayoutDashboard, User } from 'lucide-react';
import { ProjectsManager } from './ProjectsManager';
import { MessagesManager } from './MessagesManager';
import { AdminSettings } from './AdminSettings';

export function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [admin, setAdmin] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    onLogout();
  };

  const adminName = admin?.username || 'Admin';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Modern Top Navigation */}
      <header className="admin-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="admin-avatar">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-50">Admin Dashboard</h1>
                  <span className="admin-chip">Live</span>
                </div>
                <p className="text-xs text-slate-100/80">Manage projects, messages, settings</p>
              </div>
            </div>

            {/* Center: Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Right: Quick Actions & User */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddProject(true)}
                className="admin-quick-btn"
                title="Add New Project"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Project</span>
              </button>

              <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-white/15 rounded-lg border border-white/10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white hidden md:inline">
                  {adminName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="admin-logout"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation + Logout */}
          <div className="md:hidden flex gap-2 pb-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`admin-tab w-max ${activeTab === tab.id ? 'is-active' : ''}`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="admin-tab bg-red-500 text-white"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Quick bar inside content for persistent logout / context */}
      <div className="admin-quickbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="admin-chip soft">{activeTab.toUpperCase()}</span>
            <span className="text-sm text-slate-600 dark:text-slate-300">Signed in as <strong>{adminName}</strong></span>
          </div>
          <button onClick={handleLogout} className="admin-logout subtle">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' && <ProjectsManager showAddProject={showAddProject} setShowAddProject={setShowAddProject} />}
          {activeTab === 'messages' && <MessagesManager />}
          {activeTab === 'settings' && <AdminSettings />}
        </motion.div>
      </main>

      {/* Floating Action Button for Mobile - Add Project */}
      {activeTab === 'projects' && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddProject(true)}
          className="fixed bottom-6 right-6 sm:hidden w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all"
          style={{ background: 'var(--primary)' }}
          title="Add New Project"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
