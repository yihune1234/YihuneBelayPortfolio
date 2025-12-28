import { motion, useScroll, useTransform } from 'motion/react';
import { Camera, Heart, MessageCircle, Zap, Star, Send, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

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
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => handleLike(photo.photoId, e)}
                                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${likedPhotos.has(photo.photoId)
                                        ? 'text-red-500'
                                        : 'text-white/90 hover:text-red-400'
                                        }`}
                                >
                                    <Heart
                                        size={16}
                                        className={likedPhotos.has(photo.photoId) ? 'fill-red-500' : ''}
                                    />
                                    {photo.likes}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => openComments(photo, e)}
                                    className="flex items-center gap-1.5 text-white/90 text-sm font-medium hover:text-blue-400 transition-colors"
                                >
                                    <MessageCircle size={16} />
                                    {photo.commentCount}
                                </motion.button>
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

            {/* Comments Modal */}
            {selectedPhoto && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
                    onClick={closeComments}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-[var(--background)] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold">{selectedPhoto.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                                </p>
                            </div>
                            <button
                                onClick={closeComments}
                                className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {comments.length === 0 ? (
                                <div className="text-center py-12">
                                    <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                                    <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                                </div>
                            ) : (
                                comments.map((comment, idx) => (
                                    <motion.div
                                        key={comment._id || idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="glass-card p-4 rounded-xl"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white font-bold">
                                                {comment.author?.[0]?.toUpperCase() || 'A'}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-sm">{comment.author || 'Anonymous'}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(comment.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm leading-relaxed">{comment.text}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Comment Form */}
                        <form onSubmit={handleSubmitComment} className="p-6 border-t border-white/10 bg-muted/30">
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Your name (optional)"
                                    value={commentAuthor}
                                    onChange={(e) => setCommentAuthor(e.target.value)}
                                    maxLength={50}
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 focus:border-[var(--primary)] focus:outline-none transition-colors"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        maxLength={500}
                                        required
                                        className="flex-1 px-4 py-3 rounded-xl bg-background border border-white/10 focus:border-[var(--primary)] focus:outline-none transition-colors"
                                    />
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting || !newComment.trim()}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                                    >
                                        <Send size={18} />
                                        {isSubmitting ? 'Sending...' : 'Send'}
                                    </motion.button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {newComment.length}/500 characters
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
