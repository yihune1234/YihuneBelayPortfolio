import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Camera, Heart, MessageCircle, Zap, Star, Send, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import CloudinaryImage from './CloudinaryImage.jsx';

const API_URL = 'https://portfoliobackend-a6ah.onrender.com/api/photolog';

export function PhotoLog() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const [photos, setPhotos] = useState([
        {
            photoId: 'photo-1',
            url: '/images/profile.jpg',
            title: 'Professional Profile',
            likes: 156,
            commentCount: 24,
            category: 'Personal'
        },
        {
            photoId: 'photo-2',
            url: '/images/logo.png',
            title: 'Digital Identity',
            likes: 89,
            commentCount: 15,
            category: 'Design'
        },
        {
            photoId: 'photo-4',
            url: '/images/innovation.png',
            title: 'Innovation Lab',
            likes: 98,
            commentCount: 12,
            category: 'Tech'
        }
    ]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('/images/')) return imagePath; // Correct local path
        if (imagePath.startsWith('public/images/')) return imagePath.replace('public/', '/'); // Fix incorrect local path

        // Base URL for the backend
        const BASE_URL = 'https://portfoliobackend-a6ah.onrender.com';

        // Remove leading slash
        const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;

        // If it already contains 'uploads/', just prepend base URL
        if (cleanPath.startsWith('uploads/')) {
            return `${BASE_URL}/${cleanPath}`;
        }

        // Otherwise prepend /uploads/ (standard for your backend)
        return `${BASE_URL}/uploads/${cleanPath}`;
    };

    const [likedPhotos, setLikedPhotos] = useState(new Set());
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch photos from backend
    useEffect(() => {
        fetchPhotos();
        // Load liked photos from localStorage
        const saved = localStorage.getItem('likedPhotos');
        if (saved) {
            setLikedPhotos(new Set(JSON.parse(saved)));
        }
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setPhotos(data);
                } else {
                    // Auto-initialize photos if database is empty
                    await initializePhotos();
                }
            } else if (response.status === 404) {
                // Backend route might not exist yet, use static data
                console.warn('PhotoLog API not available, using static data');
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
            // Keep using static data as fallback
        }
    };

    const initializePhotos = async () => {
        try {
            // Initialize each photo in the database
            for (const photo of photos) {
                await fetch(`${API_URL}/init`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(photo)
                });
            }
            // Fetch again after initialization
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setPhotos(data);
                }
            }
        } catch (error) {
            console.error('Error initializing photos:', error);
        }
    };

    const handleLike = async (photoId, e) => {
        e.stopPropagation();

        const isLiked = likedPhotos.has(photoId);
        const endpoint = isLiked ? 'unlike' : 'like';

        try {
            const response = await fetch(`${API_URL}/${photoId}/${endpoint}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();

                // Update local state
                setPhotos(prev => prev.map(photo =>
                    photo.photoId === photoId
                        ? { ...photo, likes: data.likes }
                        : photo
                ));

                // Update liked photos
                const newLiked = new Set(likedPhotos);
                if (isLiked) {
                    newLiked.delete(photoId);
                } else {
                    newLiked.add(photoId);
                }
                setLikedPhotos(newLiked);
                localStorage.setItem('likedPhotos', JSON.stringify([...newLiked]));
            }
        } catch (error) {
            console.error('Error liking photo:', error);
        }
    };

    const openComments = async (photo, e) => {
        e.stopPropagation();
        setSelectedPhoto(photo);

        try {
            const response = await fetch(`${API_URL}/${photo.photoId}/comments`);
            if (response.ok) {
                const data = await response.json();
                setComments(data.comments || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!newComment.trim() || !selectedPhoto) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/${selectedPhoto.photoId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: newComment.trim(),
                    author: commentAuthor.trim() || 'Anonymous'
                })
            });

            if (response.ok) {
                const data = await response.json();

                // Update comments list
                setComments(prev => [data.comment, ...prev]);

                // Update photo comment count
                setPhotos(prev => prev.map(photo =>
                    photo.photoId === selectedPhoto.photoId
                        ? { ...photo, commentCount: data.commentCount }
                        : photo
                ));

                // Reset form
                setNewComment('');
                setCommentAuthor('');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeComments = () => {
        setSelectedPhoto(null);
        setComments([]);
        setNewComment('');
        setCommentAuthor('');
    };

    return (
        <section ref={sectionRef} className="section-padding container-custom relative overflow-hidden">
            {/* Cinematic Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse" />
            
            <motion.div
                style={{ opacity }}
                className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
            >
                <div className="max-w-2xl">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9, x: -50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter"
                    >
                        Visual <span className="text-gradient">Chronicle.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-xl leading-relaxed italic"
                    >
                        Capturing the essence of innovation, one frame at a time. A journey through lenses and logic.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    className="p-5 glass-card rounded-[2rem] flex items-center gap-4 border-white/20 shadow-2xl"
                >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Camera size={24} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Portfolio</p>
                        <p className="font-black text-sm italic">Behind The Interface</p>
                    </div>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 perspective-2000">
                {photos.map((photo, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 100, rotateX: 30 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            delay: idx * 0.1,
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{
                            y: -20,
                            scale: 1.05,
                            rotateY: 5,
                            transition: { duration: 0.5 }
                        }}
                        className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-2xl bg-slate-900 border border-white/10"
                        onClick={(e) => openComments(photo, e)}
                    >
                        {/* Image Engine */}
                        <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-1000">
                            <CloudinaryImage
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
                                width={600}
                                height={800}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        </div>

                        {/* Premium HUD Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <motion.div className="flex items-center gap-2 mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-[8px] font-black uppercase tracking-[0.3em] text-white border border-white/10">
                                    {photo.category}
                                </span>
                                <div className="h-px flex-1 bg-white/10" />
                            </motion.div>

                            <h4 className="text-white font-black text-2xl mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors">{photo.title}</h4>

                            <div className="flex items-center gap-6">
                                <button
                                    onClick={(e) => handleLike(photo.photoId, e)}
                                    className={`flex items-center gap-2 text-xs font-black transition-all ${likedPhotos.has(photo.photoId) ? 'text-red-500 scale-110' : 'text-white/60 hover:text-red-400'}`}
                                >
                                    <Heart size={20} className={likedPhotos.has(photo.photoId) ? 'fill-red-500' : ''} />
                                    {photo.likes}
                                </button>
                                <button
                                    className="flex items-center gap-2 text-white/60 text-xs font-black hover:text-primary transition-all"
                                >
                                    <MessageCircle size={20} />
                                    {photo.commentCount}
                                </button>
                            </div>
                        </div>

                        {/* Top Accent */}
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="glass-card !rounded-2xl p-3 border-white/20">
                                <Zap size={16} className="text-primary animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Futuristic CTA */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32 relative text-center"
            >
                <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
                <button className="btn-primary !rounded-full !px-12 !py-6 text-xl tracking-[0.2em] group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-4">
                        Explore Full Archive <Star className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                </button>
            </motion.div>

            {/* Cinematic Comments Section */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 md:p-12"
                        onClick={closeComments}
                    >
                        <motion.div
                            initial={{ scale: 0.9, rotateX: 20, opacity: 0 }}
                            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
                            exit={{ scale: 0.9, rotateX: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="bg-slate-900 max-w-5xl w-full rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(var(--primary-rgb),0.2)] border border-white/10 flex flex-col lg:flex-row h-[85vh] perspective-1000"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Visual Half */}
                            <div className="lg:w-1/2 relative bg-black">
                                <CloudinaryImage
                                    src={selectedPhoto.url}
                                    alt={selectedPhoto.title}
                                    className="w-full h-full object-cover opacity-80"
                                    width={1000}
                                    height={1200}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">Source Material</span>
                                    <h3 className="text-4xl font-black italic tracking-tighter">{selectedPhoto.title}</h3>
                                </div>
                            </div>

                            {/* Dialogue Half */}
                            <div className="lg:w-1/2 flex flex-col bg-slate-900/50 backdrop-blur-3xl">
                                <div className="p-10 border-b border-white/10 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-2xl font-black tracking-tight">Public Dialogue</h4>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-2">
                                            {comments.length} Interactive Signals Received
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeComments}
                                        className="p-4 glass rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all border-white/10"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
                                    {comments.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                                            <MessageCircle size={80} className="mb-6 stroke-1" />
                                            <p className="text-xl font-black uppercase tracking-widest">Awaiting First Signal</p>
                                        </div>
                                    ) : (
                                        comments.map((comment, idx) => (
                                            <motion.div
                                                key={comment._id || idx}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="glass-card p-6 rounded-3xl border-white/5 relative overflow-hidden group"
                                            >
                                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-black text-xl italic shadow-lg">
                                                        {comment.author?.[0]?.toUpperCase() || 'A'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="font-black text-sm uppercase tracking-wider">{comment.author || 'Entity'}</span>
                                                            <span className="text-[10px] font-black text-muted-foreground uppercase">
                                                                {new Date(comment.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm leading-relaxed font-medium text-slate-300 italic">"{comment.text}"</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                <form onSubmit={handleSubmitComment} className="p-10 border-t border-white/10 bg-black/20">
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                          <input
                                              type="text"
                                              placeholder="IDENTIFY"
                                              value={commentAuthor}
                                              onChange={(e) => setCommentAuthor(e.target.value)}
                                              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-all font-black text-xs tracking-widest uppercase"
                                          />
                                          <div className="text-right flex items-center justify-end text-[10px] font-black text-muted-foreground italic uppercase">
                                            Dialogue Protocol v1.4
                                          </div>
                                        </div>
                                        
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                placeholder="TRANSMIT YOUR THOUGHTS..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                required
                                                className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-all font-medium"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !newComment.trim()}
                                                className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 disabled:opacity-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                                            >
                                                {isSubmitting ? '...' : <Send size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
