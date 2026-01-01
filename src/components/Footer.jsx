import { Github, Linkedin, Twitter, Mail, Send, Heart } from 'lucide-react';

export function Footer({ setActiveSection }) {
    return (
        <footer className="relative pt-32 pb-12 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
                    {/* Branding */}
                    <div className="lg:col-span-2 space-y-8">
                        <button
                            onClick={() => { setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="text-4xl font-black tracking-tighter group flex items-center gap-3"
                        >
                            YIHUNE<span className="text-primary group-hover:rotate-12 transition-transform duration-500">.</span>
                        </button>
                        <p className="text-muted-foreground text-lg max-w-md leading-relaxed font-medium">
                            Architecting the future through sophisticated code and avant-garde design. Transforming complex ideas into seamless digital realities.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: 'https://github.com/yihune1234', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/in/yihune-belay-30b0a4383', label: 'LinkedIn' },
                                { icon: Send, href: 'https://t.me/Y13bel', label: 'Telegram' }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 glass rounded-2xl hover:bg-primary hover:text-white transition-all hover:-translate-y-2 shadow-xl group border-white/20"
                                    aria-label={social.label}
                                >
                                    <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">The Compass</h4>
                        <ul className="grid gap-4">
                            {['home', 'about', 'projects', 'contact'].map((id) => (
                                <li key={id}>
                                    <button
                                        onClick={() => { setActiveSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="text-muted-foreground hover:text-primary transition-all capitalize text-lg font-black tracking-tight"
                                    >
                                        {id}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Direct Line</h4>
                        <div className="space-y-6">
                            <a href="mailto:yihunebelay859@gmail.com" className="glass-card !bg-white/5 p-4 flex items-center gap-4 group transition-all hover:border-primary/50">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail size={18} />
                                </div>
                                <span className="text-sm font-bold truncate">yihunebelay859@gmail.com</span>
                            </a>
                            <a href="https://t.me/Y13bel" className="glass-card !bg-white/5 p-4 flex items-center gap-4 group transition-all hover:border-primary/50">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Send size={18} />
                                </div>
                                <span className="text-sm font-bold">@Y13bel</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                            &copy; {new Date().getFullYear()} Yihune Belay. All rights reserved.
                        </p>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/20" />
                        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2">
                           System Status: <span className="text-green-500 animate-pulse">Operational</span>
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 glass px-6 py-2 rounded-full border-white/20">
                        <Heart size={14} className="text-primary fill-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Curated in Ethiopia</span>
                    </div>
                </div>
            </div>
        </footer>
    );

}
