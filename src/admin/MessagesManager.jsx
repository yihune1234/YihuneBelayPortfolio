import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Trash2, Eye, Clock, CheckCircle, Inbox, MailOpen, Archive, TrendingUp, Search, Check, Send, User, MessageSquare } from 'lucide-react';

export function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('https://portfoliobackend-a6ah.onrender.com/api/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`https://portfoliobackend-a6ah.onrender.com/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = messages.filter(m => !m.isRead);
    if (!unread.length) return;
    const token = localStorage.getItem('adminToken');
    try {
      await Promise.all(
        unread.map(msg =>
          fetch(`https://portfoliobackend-a6ah.onrender.com/api/messages/${msg._id}/read`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      fetchMessages();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`https://portfoliobackend-a6ah.onrender.com/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const byFilter = filter === 'unread' ? !msg.isRead : filter === 'read' ? msg.isRead : true;
      const term = search.trim().toLowerCase();
      const bySearch = !term
        ? true
        : [msg.name, msg.email, msg.subject, msg.message].some((field) =>
          (field || '').toLowerCase().includes(term)
        );
      return byFilter && bySearch;
    });
  }, [messages, filter, search]);

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[var(--primary)] transition-colors" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 glass rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-medium"
            placeholder="Search messages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {['all', 'unread', 'read'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-[var(--primary)] text-white' : 'glass hover:bg-white/10'
                }`}
            >
              {f}
            </button>
          ))}
          <button onClick={handleMarkAllAsRead} className="px-5 py-2.5 rounded-xl glass hover:bg-green-500/10 hover:text-green-500 transition-all text-xs font-black uppercase tracking-widest">
            Mark All Read
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* List */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((msg, idx) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead) handleMarkAsRead(msg._id);
                }}
                className={`glass-card p-6 cursor-pointer transition-all border-l-4 ${selectedMessage?._id === msg._id ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-transparent'
                  } ${!msg.isRead ? 'shadow-lg shadow-[var(--primary)]/10 ring-1 ring-[var(--primary)]/20' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-[var(--primary)]">
                      {msg.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{msg.name}</h4>
                      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {!msg.isRead && <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />}
                </div>
                <h5 className="font-bold text-sm mb-1">{msg.subject}</h5>
                <p className="text-xs text-muted-foreground line-clamp-2">{msg.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredMessages.length === 0 && (
            <div className="glass-card p-20 text-center flex flex-col items-center">
              <Inbox size={48} className="text-muted-foreground mb-4 opacity-20" />
              <p className="font-bold text-muted-foreground">No messages found.</p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-8 md:p-10 space-y-8"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-[var(--primary)] text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-[var(--primary)]/30">
                      {selectedMessage.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">{selectedMessage.name}</h3>
                      <p className="text-muted-foreground font-bold">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(selectedMessage._id)} className="p-3 glass rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="p-6 glass rounded-2xl bg-white/5">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground mb-4">Message Content</p>
                    <h4 className="font-black text-lg mb-4">{selectedMessage.subject}</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div className="flex gap-4">
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="btn-primary flex-1 flex items-center justify-center gap-3">
                      <Send size={18} /> Reply via Email
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-20 text-center flex flex-col items-center justify-center h-[50vh]">
                <MessageSquare size={64} className="text-muted-foreground mb-6 opacity-10" />
                <h3 className="text-xl font-bold text-muted-foreground mb-2">Select a Conversation</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Pick a message from the list to view the full discussion and respond.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
