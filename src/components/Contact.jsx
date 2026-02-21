import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send, Phone, MapPin, MessageSquare } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://portfoliobackend-a6ah.onrender.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Connection error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'yihunebelay859@gmail.com', href: 'mailto:yihunebelay859@gmail.com' },
    { icon: Phone, label: 'Phone ethio telecom', value: '+251987414282', href: 'tel:+251987414282' },
    { icon: Phone, label: 'Phone safaricom', value: '+251721874182', href: 'tel:+251721874182' },

    { icon: MapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yihune1234', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yihune-belay-30b0a4383', label: 'LinkedIn' },
    { icon: Send, href: 'https://t.me/Y13bel', label: 'Telegram' },
  ];

  return (
    <section className="section-padding container-custom relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
        >
          Get In <span className="text-gradient">Touch.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Whether you have a groundbreaking idea or just want to explore possibilities, I'm here to bring your vision to life.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-5 gap-16 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid gap-6">
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 flex items-center gap-6 group border-white/20"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <info.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-bold text-lg group-hover:text-primary transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 border-white/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <h4 className="font-black text-2xl mb-8 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              Digital Footprint
            </h4>
            <div className="flex gap-5">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 glass rounded-[1.25rem] hover:text-white hover:bg-primary hover:scale-110 transition-all shadow-xl"
                  aria-label={social.label}
                >
                  <social.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-3 glass-card p-10 md:p-14 border-white/20 shadow-2xl relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <form onSubmit={handleSubmit} className="grid gap-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-6 py-5 rounded-2xl"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Email Habitat"
                  className="w-full px-6 py-5 rounded-2xl"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Subject</label>
              <input
                type="text"
                required
                placeholder="What's this about?"
                className="w-full px-6 py-5 rounded-2xl"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Message</label>
              <textarea
                required
                placeholder="Let's dive into the specifics..."
                rows="6"
                className="w-full px-6 py-5 rounded-2xl"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl font-black text-sm text-center shadow-inner ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}
              >
                {status.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full group !py-6 text-xl"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Transmitting...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Send Message <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>

  );
}
