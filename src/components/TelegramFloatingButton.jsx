import { Send } from 'lucide-react';
import { motion } from 'motion/react';

export function TelegramFloatingButton() {
  return (
    <motion.a
      href="https://t.me/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      className="fixed left-6 bottom-6 z-40 w-14 h-14 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      aria-label="Contact on Telegram"
    >
      <Send className="w-6 h-6" />
      <span className="absolute left-full ml-3 bg-slate-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Message me on Telegram
      </span>
    </motion.a>
  );
}
