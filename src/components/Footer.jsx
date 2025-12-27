import { Github, Linkedin, Twitter, Mail, Send, Heart } from 'lucide-react';

export function Footer({ setActiveSection }) {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Branding */}
                    <div className="space-y-6">
                        <button
                            onClick={() => { setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="text-2xl font-black tracking-tighter"
                        >
                            YIHUNE<span className="text-[var(--primary)]">.</span>
                        </button>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Designing and developing professional digital experiences with a focus on impact, performance, and user-centricity.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: 'https://github.com/yihune1234' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/in/yihune-belay-30b0a4383' },
                                { icon: Send, href: 'https://t.me/Y13bel' }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 glass rounded-lg hover:text-[var(--primary)] transition-colors"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Quick Navigation</h4>
                        <ul className="grid gap-4">
                            {['home', 'about', 'projects', 'contact'].map((id) => (
                                <li key={id}>
                                    <button
                                        onClick={() => { setActiveSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="text-muted-foreground hover:text-[var(--primary)] transition-colors capitalize text-sm font-medium"
                                    >
                                        {id}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail size={16} className="text-[var(--primary)]" />
                                <a href="mailto:yihunebelay859@gmail.com" className="hover:text-[var(--primary)] transition-colors">
                                    yihunebelay859@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Send size={16} className="text-[var(--primary)]" />
                                <a href="https://t.me/Y13bel" className="hover:text-[var(--primary)] transition-colors">
                                    Telegram: @Y13bel
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground font-medium">
                        &copy; {new Date().getFullYear()} Yihune Belay. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                        Made with <Heart size={12} className="text-red-500 fill-red-500" /> in Ethiopia
                    </p>
                </div>
            </div>
        </footer>
    );
}
