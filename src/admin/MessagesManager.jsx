import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Mail, Trash2, Eye, Clock, CheckCircle, Inbox, MailOpen, Archive, TrendingUp, Search, Check } from 'lucide-react';

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
      await fetch(`https://portfoliobackend-a6ah.onrender.com/${id}/read`, {
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
  const readCount = messages.filter(m => m.isRead).length;
  const total = messages.length;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="message-hero">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-2">
            Inbox Management
            <span className="badge-soft">{unreadCount} Unread</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Messages</h2>
          <p className="text-white/85 mt-1">Manage your contact form submissions and inquiries in one place.</p>
          <div className="flex gap-3 flex-wrap mt-4">
            <div className="stat-chip">
              <Inbox className="w-4 h-4" />
              <div>
                <p className="text-xs text-slate-200">Total</p>
                <p className="text-lg font-semibold text-white">{total}</p>
              </div>
            </div>
            <div className="stat-chip">
              <Mail className="w-4 h-4" />
              <div>
                <p className="text-xs text-slate-200">Unread</p>
                <p className="text-lg font-semibold text-white">{unreadCount}</p>
              </div>
            </div>
            <div className="stat-chip">
              <MailOpen className="w-4 h-4" />
              <div>
                <p className="text-xs text-slate-200">Read</p>
                <p className="text-lg font-semibold text-white">{readCount}</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleMarkAllAsRead} className="mark-all-btn">
          <Check className="w-4 h-4" />
          Mark all read
        </button>
      </div>

      {/* Filters + search */}
      <div className="message-filters">
        <div className="filter-tabs">
          <button onClick={() => setFilter('all')} className={`filter-pill ${filter === 'all' ? 'is-active' : ''}`}>
            All ({total})
          </button>
          <button onClick={() => setFilter('unread')} className={`filter-pill ${filter === 'unread' ? 'is-active' : ''}`}>
            Unread ({unreadCount})
          </button>
          <button onClick={() => setFilter('read')} className={`filter-pill ${filter === 'read' ? 'is-active' : ''}`}>
            Read ({readCount})
          </button>
        </div>
        <div className="search-input">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
              <Archive className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">No messages found</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Messages will appear here when users contact you</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.isRead) handleMarkAsRead(message._id);
                }}
                className={`message-card ${!message.isRead ? 'is-unread' : ''} ${
                  selectedMessage?._id === message._id ? 'is-selected' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.isRead 
                        ? 'bg-slate-100 dark:bg-slate-700' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}>
                      <Mail className={`w-5 h-5 ${message.isRead ? 'text-slate-400' : 'text-white'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100">{message.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{message.email}</p>
                    </div>
                  </div>
                  {!message.isRead && (
                    <span className="pill pill-soft">New</span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{message.subject}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{message.message}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 dark:text-slate-500">
                  <Clock className="w-3 h-3" />
                  {new Date(message.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:sticky lg:top-24 h-fit">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--primary)' }}>
                    <span className="text-white font-bold text-lg">{selectedMessage.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{selectedMessage.name}</h3>
                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-500 hover:underline text-sm">
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                {selectedMessage.isRead ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Eye className="w-6 h-6 text-blue-500" />
                )}
              </div>

              <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Subject</p>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{selectedMessage.subject}</p>
              </div>

              <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Message</p>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  style={{ background: 'var(--primary)' }}
                >
                  <Mail className="w-4 h-4" />
                  Reply
                </a>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:shadow-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
              <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Select a message to view details</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Click on any message from the list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
