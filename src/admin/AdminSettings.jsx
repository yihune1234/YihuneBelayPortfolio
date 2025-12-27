import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Key, User, Save, AlertCircle, CheckCircle, Smartphone, Globe, Bell } from 'lucide-react';

export function AdminSettings() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      const parsed = JSON.parse(adminData);
      setAdmin(parsed);
      setFormData(prev => ({ ...prev, username: parsed.username }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      return setStatus({ type: 'error', message: 'New passwords do not match!' });
    }

    setLoading(true);
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch('https://portfoliobackend-a6ah.onrender.com/api/admin/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Profile updated successfully!' });
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        setAdmin(data.admin);
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      } else {
        setStatus({ type: 'error', message: data.message || 'Update failed' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Connection error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-3xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shadow-inner shadow-[var(--primary)]/10">
          <Shield size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tight">Account Settings</h2>
          <p className="text-muted-foreground font-medium">Manage your security and profile preferences</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Navigation/Info */}
        <div className="space-y-4">
          {[
            { icon: User, label: 'Profile' },
            { icon: Key, label: 'Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: Globe, label: 'Digital Presence' }
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${i === 0 ? 'bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm' : 'hover:bg-white/5 text-muted-foreground'
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}

          <div className="glass-card p-6 mt-8">
            <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-4">Account Health</h4>
            <div className="flex items-center gap-3 text-green-500 mb-2">
              <CheckCircle size={14} />
              <span className="text-xs font-bold">Encrypted Connection</span>
            </div>
            <div className="flex items-center gap-3 text-blue-500">
              <Smartphone size={14} />
              <span className="text-xs font-bold">Mobile Accessible</span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-10 space-y-8"
          >
            {status.message && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                {status.message}
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Admin Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[var(--primary)] transition-colors" />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-4 glass rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-bold"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="font-black text-sm mb-6 flex items-center gap-2">
                  <Key size={16} className="text-[var(--primary)]" /> Change Password
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-5 py-3 glass rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      placeholder="Required to make changes"
                      value={formData.currentPassword}
                      onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-5 py-3 glass rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                        placeholder="Leave blank to keep current"
                        value={formData.newPassword}
                        onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Confirm New</label>
                      <input
                        type="password"
                        className="w-full px-5 py-3 glass rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                        placeholder="Repeat new password"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-5 flex items-center justify-center gap-3 text-lg font-black tracking-tight"
            >
              {loading ? 'Saving Changes...' : (
                <>
                  <Save size={20} /> Save Configuration
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
