import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, RefreshCw, Image, MessageCircle, Heart, Edit2, X, Check } from 'lucide-react';

const API_URL = 'https://portfoliobackend-a6ah.onrender.com/api/photolog';

export function PhotoLogManager() {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', category: '', url: '' });

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('/images/')) return imagePath;
        if (imagePath.startsWith('public/images/')) return imagePath.replace('public/', '/');

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

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setPhotos(data);
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (photoId) => {
        try {
            const response = await fetch(`${API_URL}/${photoId}/comments`);
            if (response.ok) {
                const data = await response.json();
                setComments(data.comments || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleDeletePhoto = async (photoId) => {
        if (!confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/${photoId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setPhotos(photos.filter(p => p.photoId !== photoId));
                alert('Photo deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('Failed to delete photo');
        }
    };

    const handleDeleteComment = async (photoId, commentId) => {
        if (!confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/${photoId}/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setComments(comments.filter(c => c._id !== commentId));
                // Update photo comment count
                setPhotos(photos.map(p =>
                    p.photoId === photoId
                        ? { ...p, commentCount: p.commentCount - 1 }
                        : p
                ));
                alert('Comment deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment');
        }
    };

    const handleResetLikes = async (photoId) => {
        if (!confirm('Are you sure you want to reset likes to 0?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/${photoId}/reset-likes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setPhotos(photos.map(p =>
                    p.photoId === photoId ? { ...p, likes: 0 } : p
                ));
                alert('Likes reset successfully');
            }
        } catch (error) {
            console.error('Error resetting likes:', error);
            alert('Failed to reset likes');
        }
    };

    const handleClearComments = async (photoId) => {
        if (!confirm('Are you sure you want to delete ALL comments for this photo?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/${photoId}/comments`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setPhotos(photos.map(p =>
                    p.photoId === photoId ? { ...p, commentCount: 0 } : p
                ));
                setComments([]);
                alert('All comments deleted successfully');
            }
        } catch (error) {
            console.error('Error clearing comments:', error);
            alert('Failed to clear comments');
        }
    };

    const handleEditPhoto = (photo) => {
        setEditingPhoto(photo.photoId);
        setEditForm({
            title: photo.title,
            category: photo.category,
            url: photo.url
        });
    };

    const handleUpdatePhoto = async (photoId) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/${photoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });

            if (response.ok) {
                const data = await response.json();
                setPhotos(photos.map(p =>
                    p.photoId === photoId ? { ...p, ...editForm } : p
                ));
                setEditingPhoto(null);
                alert('Photo updated successfully');
            }
        } catch (error) {
            console.error('Error updating photo:', error);
            alert('Failed to update photo');
        }
    };

    const viewComments = (photo) => {
        setSelectedPhoto(photo);
        fetchComments(photo.photoId);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading photos...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-black mb-2">PhotoLog Manager</h1>
                <p className="text-muted-foreground">Manage photos, likes, and comments</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                            <Image className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{photos.length}</p>
                            <p className="text-sm text-muted-foreground">Total Photos</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                            <Heart className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {photos.reduce((sum, p) => sum + p.likes, 0)}
                            </p>
                            <p className="text-sm text-muted-foreground">Total Likes</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-xl">
                            <MessageCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {photos.reduce((sum, p) => sum + p.commentCount, 0)}
                            </p>
                            <p className="text-sm text-muted-foreground">Total Comments</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                    <motion.div
                        key={photo.photoId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-2xl overflow-hidden"
                    >
                        {editingPhoto === photo.photoId ? (
                            <div className="p-6 space-y-4">
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 focus:border-[var(--primary)] focus:outline-none"
                                    placeholder="Title"
                                />
                                <input
                                    type="text"
                                    value={editForm.category}
                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 focus:border-[var(--primary)] focus:outline-none"
                                    placeholder="Category"
                                />
                                <input
                                    type="text"
                                    value={editForm.url}
                                    onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 focus:border-[var(--primary)] focus:outline-none"
                                    placeholder="Image URL"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUpdatePhoto(photo.photoId)}
                                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                                    >
                                        <Check size={18} /> Save
                                    </button>
                                    <button
                                        onClick={() => setEditingPhoto(null)}
                                        className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
                                    >
                                        <X size={18} /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="relative aspect-video">
                                    <img
                                        src={getImageUrl(photo.url)}
                                        alt={photo.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full font-bold">
                                            {photo.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-4">{photo.title}</h3>

                                    <div className="flex items-center gap-4 mb-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Heart size={16} className="text-red-500" />
                                            <span>{photo.likes} likes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle size={16} className="text-blue-500" />
                                            <span>{photo.commentCount} comments</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handleEditPhoto(photo)}
                                            className="px-3 py-2 bg-blue-500/20 text-blue-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors"
                                        >
                                            <Edit2 size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => viewComments(photo)}
                                            className="px-3 py-2 bg-green-500/20 text-green-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors"
                                        >
                                            <MessageCircle size={14} /> Comments
                                        </button>
                                        <button
                                            onClick={() => handleResetLikes(photo.photoId)}
                                            className="px-3 py-2 bg-orange-500/20 text-orange-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-500/30 transition-colors"
                                        >
                                            <RefreshCw size={14} /> Reset Likes
                                        </button>
                                        <button
                                            onClick={() => handleDeletePhoto(photo.photoId)}
                                            className="px-3 py-2 bg-red-500/20 text-red-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/30 transition-colors"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Comments Modal */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div
                        className="bg-[var(--background)] max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold">{selectedPhoto.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleClearComments(selectedPhoto.photoId)}
                                    className="px-4 py-2 bg-red-500/20 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500/30 transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {comments.length === 0 ? (
                                <div className="text-center py-12">
                                    <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                                    <p className="text-muted-foreground">No comments yet</p>
                                </div>
                            ) : (
                                comments.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className="glass-card p-4 rounded-xl flex items-start justify-between gap-4"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-bold text-sm">{comment.author}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(comment.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-sm">{comment.text}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteComment(selectedPhoto.photoId, comment._id)}
                                            className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
