const express = require('express');
const router = express.Router();
const PhotoLog = require('../models/PhotoLog');
const { upload, cloudinaryUpload } = require('../middleware/upload');
const auth = require('../middleware/auth');

// Upload photo to Cloudinary (Admin only)
router.post('/upload', auth, upload.single('image'), cloudinaryUpload, async (req, res) => {
    try {
        if (!req.file || !req.file.cloudinaryUrl) {
            return res.status(400).json({ message: 'No image uploaded or upload failed' });
        }

        res.json({
            message: 'Image uploaded successfully',
            url: req.file.cloudinaryUrl,
            public_id: req.file.public_id
        });
    } catch (error) {
        console.error('PhotoLog Upload Error:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
});

// Get all photos with their likes and comments count
router.get('/', async (req, res) => {
    try {
        const photos = await PhotoLog.find()
            .select('photoId title url category likes comments createdAt')
            .sort({ createdAt: -1 });

        // Transform to include comment count
        const photosWithCounts = photos.map(photo => ({
            photoId: photo.photoId,
            title: photo.title,
            url: photo.url,
            category: photo.category,
            likes: photo.likes,
            commentCount: photo.comments.length,
            createdAt: photo.createdAt
        }));

        res.json(photosWithCounts);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ message: 'Error fetching photos', error: error.message });
    }
});

// Get a specific photo with all comments
router.get('/:photoId', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.json({
            photoId: photo.photoId,
            title: photo.title,
            url: photo.url,
            category: photo.category,
            likes: photo.likes,
            comments: photo.comments.sort((a, b) => b.createdAt - a.createdAt),
            createdAt: photo.createdAt
        });
    } catch (error) {
        console.error('Error fetching photo:', error);
        res.status(500).json({ message: 'Error fetching photo', error: error.message });
    }
});

// Initialize/Create a photo (can be called from frontend on first load)
router.post('/init', async (req, res) => {
    try {
        const { photoId, title, url, category } = req.body;

        if (!photoId || !title || !url) {
            return res.status(400).json({ message: 'photoId, title, and url are required' });
        }

        // Check if photo already exists
        let photo = await PhotoLog.findOne({ photoId });

        if (photo) {
            return res.json({
                message: 'Photo already exists',
                photo: {
                    photoId: photo.photoId,
                    title: photo.title,
                    url: photo.url,
                    category: photo.category,
                    likes: photo.likes,
                    commentCount: photo.comments.length
                }
            });
        }

        // Create new photo
        photo = new PhotoLog({
            photoId,
            title,
            url,
            category: category || 'General',
            likes: 0,
            comments: []
        });

        await photo.save();

        res.status(201).json({
            message: 'Photo initialized successfully',
            photo: {
                photoId: photo.photoId,
                title: photo.title,
                url: photo.url,
                category: photo.category,
                likes: photo.likes,
                commentCount: photo.comments.length
            }
        });
    } catch (error) {
        console.error('Error initializing photo:', error);
        res.status(500).json({ message: 'Error initializing photo', error: error.message });
    }
});

// Like a photo (anonymous)
router.post('/:photoId/like', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        photo.likes += 1;
        await photo.save();

        res.json({
            message: 'Photo liked successfully',
            likes: photo.likes
        });
    } catch (error) {
        console.error('Error liking photo:', error);
        res.status(500).json({ message: 'Error liking photo', error: error.message });
    }
});

// Unlike a photo (anonymous)
router.post('/:photoId/unlike', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        if (photo.likes > 0) {
            photo.likes -= 1;
            await photo.save();
        }

        res.json({
            message: 'Photo unliked successfully',
            likes: photo.likes
        });
    } catch (error) {
        console.error('Error unliking photo:', error);
        res.status(500).json({ message: 'Error unliking photo', error: error.message });
    }
});

// Add a comment to a photo (anonymous)
router.post('/:photoId/comment', async (req, res) => {
    try {
        const { text, author } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        if (text.length > 500) {
            return res.status(400).json({ message: 'Comment text must be 500 characters or less' });
        }

        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        const newComment = {
            text: text.trim(),
            author: author && author.trim().length > 0 ? author.trim() : 'Anonymous',
            createdAt: new Date()
        };

        photo.comments.push(newComment);
        await photo.save();

        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment,
            commentCount: photo.comments.length
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
});

// Get comments for a specific photo
router.get('/:photoId/comments', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        // Sort comments by newest first
        const sortedComments = photo.comments.sort((a, b) => b.createdAt - a.createdAt);

        res.json({
            photoId: photo.photoId,
            comments: sortedComments,
            total: sortedComments.length
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
});

// Delete a comment (optional - for admin use)
router.delete('/:photoId/comment/:commentId', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        const commentIndex = photo.comments.findIndex(
            comment => comment._id.toString() === req.params.commentId
        );

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        photo.comments.splice(commentIndex, 1);
        await photo.save();

        res.json({
            message: 'Comment deleted successfully',
            commentCount: photo.comments.length
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
});

// Admin: Delete a photo
router.delete('/:photoId', async (req, res) => {
    try {
        const photo = await PhotoLog.findOneAndDelete({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.json({
            message: 'Photo deleted successfully',
            photo: {
                photoId: photo.photoId,
                title: photo.title
            }
        });
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ message: 'Error deleting photo', error: error.message });
    }
});

// Admin: Update photo details
router.put('/:photoId', async (req, res) => {
    try {
        const { title, category, url } = req.body;

        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        if (title) photo.title = title;
        if (category) photo.category = category;
        if (url) photo.url = url;

        await photo.save();

        res.json({
            message: 'Photo updated successfully',
            photo: {
                photoId: photo.photoId,
                title: photo.title,
                url: photo.url,
                category: photo.category,
                likes: photo.likes,
                commentCount: photo.comments.length
            }
        });
    } catch (error) {
        console.error('Error updating photo:', error);
        res.status(500).json({ message: 'Error updating photo', error: error.message });
    }
});

// Admin: Reset likes for a photo
router.post('/:photoId/reset-likes', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        photo.likes = 0;
        await photo.save();

        res.json({
            message: 'Likes reset successfully',
            likes: photo.likes
        });
    } catch (error) {
        console.error('Error resetting likes:', error);
        res.status(500).json({ message: 'Error resetting likes', error: error.message });
    }
});

// Admin: Clear all comments for a photo
router.delete('/:photoId/comments', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        const commentCount = photo.comments.length;
        photo.comments = [];
        await photo.save();

        res.json({
            message: `Deleted ${commentCount} comments successfully`,
            commentCount: 0
        });
    } catch (error) {
        console.error('Error clearing comments:', error);
        res.status(500).json({ message: 'Error clearing comments', error: error.message });
    }
});

module.exports = router;
