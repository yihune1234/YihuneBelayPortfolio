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
    <section className="section-padding container-custom">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          Let's <span className="text-[var(--primary)]">Connect</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities!
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4">
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                  <info.icon className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{info.label}</p>
                  <p className="font-bold">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="glass-card p-8">
            <h4 className="font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--primary)]" />
              Follow Me
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-2xl hover:text-[var(--primary)] hover:scale-110 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 glass-card p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-5 py-4 glass rounded-2xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="hello@example.com"
                  className="w-full px-5 py-4 glass rounded-2xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Project Inquiry"
                className="w-full px-5 py-4 glass rounded-2xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
              <textarea
                required
                placeholder="Tell me about your project..."
                rows="5"
                className="w-full px-5 py-4 glass rounded-2xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all resize-none"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl font-bold text-sm text-center ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}
              >
                {status.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 !py-5 text-lg"
            >
              {loading ? 'Sending...' : (
                <>
                  Send Message <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
