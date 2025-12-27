import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut,
  FolderKanban,
  MessageSquare,
  Settings,
  Plus,
  LayoutDashboard,
  User,
  TrendingUp,
  Eye,
  Mail,
  Home
} from 'lucide-react';
import { ProjectsManager } from './ProjectsManager';
import { MessagesManager } from './MessagesManager';
import { AdminSettings } from './AdminSettings';

export function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [admin, setAdmin] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    views: '1.2k'
  });

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const pRes = await fetch('https://portfoliobackend-a6ah.onrender.com/api/projects');
      const pData = await pRes.json();
      const mRes = await fetch('https://portfoliobackend-a6ah.onrender.com/api/messages');
      const mData = await mRes.json();

      setStats({
        projects: pData.length,
        messages: mData.length,
        views: '2.4k' // Mock views since backend might not have it
      });
    } catch (e) {
      console.error(e);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const adminName = admin?.username || 'Admin';

  const Overview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'text-blue-500' },
          { label: 'Messages Received', value: stats.messages, icon: Mail, color: 'text-purple-500' },
          { label: 'Profile Views', value: stats.views, icon: Eye, color: 'text-green-500' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">{stat.label}</p>
              <h3 className="text-4xl font-black">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-white/5 ${stat.color}`}>
              <stat.icon size={32} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h4 className="font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[var(--primary)]" />
            Recent Activity
          </h4>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-[var(--primary)]/20 transition-all">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                <p className="text-sm flex-1">New message received from <strong>User {i + 1}</strong></p>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-[var(--primary)]/10 flex items-center justify-center mb-6">
            <LayoutDashboard size={40} className="text-[var(--primary)]" />
          </div>
          <h4 className="text-xl font-bold mb-2">Welcome back, {adminName}!</h4>
          <p className="text-muted-foreground text-sm max-w-xs mb-8">
            Your portfolio is performing great today. You have {stats.messages} unread messages.
          </p>
          <button onClick={() => setActiveTab('messages')} className="btn-primary w-full">
            Check Inbox
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-foreground">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-72 glass border-r border-white/10 z-[100] hidden sm:flex flex-col p-6">
        <div className="mb-12 px-2">
          <span className="text-2xl font-black tracking-tighter">
            ADM<span className="text-[var(--primary)]">.</span>
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === tab.id
                  ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                  : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'
                }`}
            >
              <tab.icon size={22} />
              <span className="font-bold hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all mt-auto"
        >
          <LogOut size={22} />
          <span className="font-bold hidden md:inline">Logout</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="sm:ml-20 md:ml-72 min-h-screen">
        <header className="sticky top-0 z-50 glass border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-widest">{activeTab}</h2>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddProject(true)}
              className="btn-primary !py-2 !px-4 text-sm flex items-center gap-2"
            >
              <Plus size={18} /> New Project
            </button>
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center font-bold text-[var(--primary)]">
              {adminName[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-6 md:p-12 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'projects' && <ProjectsManager showAddProject={showAddProject} setShowAddProject={setShowAddProject} />}
              {activeTab === 'messages' && <MessagesManager />}
              {activeTab === 'settings' && <AdminSettings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 p-4 flex justify-between items-center z-[100]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-xl ${activeTab === tab.id ? 'text-[var(--primary)]' : 'text-muted-foreground'}`}
          >
            <tab.icon size={24} />
          </button>
        ))}
        <button onClick={onLogout} className="p-3 rounded-xl text-red-500">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
}
