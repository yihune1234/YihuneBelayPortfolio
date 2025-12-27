import { motion, useScroll, useTransform } from 'motion/react';
import { Camera, Heart, MessageCircle, Zap, Star } from 'lucide-react';
import { useRef } from 'react';

export function PhotoLog() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const photos = [
        {
            url: '/images/yihune .jpg',
            title: 'Professional Portrait',
            likes: 156,
            comments: 24,
            category: 'Personal'
        },
        {
            url: '/images/ynm.png',
            title: 'Creative Work',
            likes: 89,
            comments: 15,
            category: 'Design'
        },
        {
            url: '/images/yihune-dire.png',
            title: 'Project Showcase',
            likes: 124,
            comments: 18,
            category: 'Development'
        },
        {
            url: '/images/image copy 2.png',
            title: 'Innovation Hub',
            likes: 98,
            comments: 12,
            category: 'Tech'
        }
    ];

    return (
        <section ref={sectionRef} className="section-padding container-custom overflow-hidden">
            <motion.div
                style={{ opacity }}
                className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
            >
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
                    >
                        Photo <span className="text-[var(--primary)]">Log</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-xl"
                    >
                        A glimpse into my daily life, learning journey, and the moments that inspire my work.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="p-3 glass rounded-2xl flex items-center gap-2 font-bold text-sm"
                >
                    <Camera size={18} className="text-[var(--primary)]" />
                    Behind the Scenes
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {photos.map((photo, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50, rotateY: -15 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            delay: idx * 0.15,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{
                            y: -10,
                            rotateY: 5,
                            rotateX: 5,
                            scale: 1.02,
                            transition: { duration: 0.3 }
                        }}
                        className="group relative aspect-[3/4] overflow-hidden rounded-3xl cursor-pointer"
                        style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                        }}
                    >
                        {/* Image */}
                        <motion.img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Content Overlay */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            {/* Category Badge */}
                            <div className="mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-bold text-white">
                                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                    {photo.category}
                                </span>
                            </div>

                            <h4 className="text-white font-bold text-lg mb-3">{photo.title}</h4>

                            <div className="flex items-center gap-4">
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className="flex items-center gap-1.5 text-white/90 text-sm font-medium"
                                >
                                    <Heart size={16} className="fill-red-500 text-red-500" />
                                    {photo.likes}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className="flex items-center gap-1.5 text-white/90 text-sm font-medium"
                                >
                                    <MessageCircle size={16} className="text-blue-400" />
                                    {photo.comments}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Top Right Icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute top-4 right-4 p-2.5 glass rounded-full opacity-0 group-hover:opacity-100"
                        >
                            <Camera size={16} className="text-white" />
                        </motion.div>

                        {/* Decorative Corner Accent */}
                        <motion.div
                            initial={{ scale: 0, rotate: 0 }}
                            whileHover={{ scale: 1, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[var(--primary)]/30 to-transparent rounded-br-full opacity-0 group-hover:opacity-100"
                        />

                        {/* Bottom Glow Effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </motion.div>
                ))}
            </div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 flex flex-col items-center gap-6"
            >
                <motion.div
                    style={{ y }}
                    className="relative"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-outline flex items-center gap-2 group relative overflow-hidden"
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"
                        />
                        <Zap size={18} className="group-hover:text-[var(--primary)] transition-colors" />
                        Follow My Journey
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-muted-foreground"
                >
                    Stay updated with my latest projects and adventures
                </motion.p>
            </motion.div>
        </section>
    );
}
