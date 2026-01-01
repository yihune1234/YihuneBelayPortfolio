import { Send } from 'lucide-react';
import { motion } from 'motion/react';

export function TelegramFloatingButton() {
  return (
    <motion.a
      href="https://t.me/Y13bel"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1.5 
      }}
      className="fixed left-8 bottom-8 z-[100] group"
      aria-label="Contact on Telegram"
    >
      <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all animate-pulse" />
      
      <div className="relative w-16 h-16 bg-gradient-to-br from-[#0088cc] to-[#00b2ff] text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 border border-white/20">
        <Send className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        
        {/* Animated Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-bounce" />
      </div>

      <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none">
        <div className="whitespace-nowrap glass-card !px-6 !py-3 !rounded-2xl border-white/20 shadow-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Direct Signal</p>
          <p className="font-black text-sm text-foreground">Initiate Telegram Dialogue</p>
        </div>
        <div className="w-4 h-px bg-white/20" />
      </div>
    </motion.a>
  );
}

