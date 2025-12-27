import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Eye, EyeOff, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://portfoliobackend-a6ah.onrender.com1/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        onLogin(data.token, data.admin);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    { icon: ShieldCheck, title: 'Secure access', text: 'JWT-protected admin area' },
    { icon: KeyRound, title: 'API ready', text: 'Uses existing Express endpoints' },
    { icon: Sparkles, title: 'Live editing', text: 'Manage projects & messages' },
  ];

  return (
    <div className="min-h-[90vh] admin-auth-shell px-4 py-12">
      <div className="max-w-6xl mx-auto auth-grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="auth-panel"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'var(--primary)' }}>
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Admin Access</p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Sign in to Dashboard</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="field">
              <label className="field-label">Username</label>
              <div className="field-wrapper">
                <User className="field-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="field-input"
                  placeholder="Enter admin username"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-wrapper">
                <Lock className="field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-visibility"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="alert error"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn w-full flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Login as Admin'}
            </button>
      
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="auth-sidebar"
        >
          <div className="sidebar-inner">
            <div className="flex items-center gap-3 mb-6">
              <div className="pill pill-soft inline-flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Secure zone
              </div>
            </div>

            <div className="status-chip">
              <span className="dot" />
              Waiting for admin login
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
