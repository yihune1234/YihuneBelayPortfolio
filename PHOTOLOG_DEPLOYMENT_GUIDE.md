# PhotoLog Backend Deployment Guide

## Issue
The PhotoLog API routes return 404 errors because they haven't been deployed to your production backend on Render.

## Solution
You need to add the PhotoLog routes to your backend repository and redeploy.

## Files to Add to Your Backend

### 1. Create `models/PhotoLog.js`

```javascript
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    author: {
        type: String,
        default: 'Anonymous',
        trim: true,
        maxlength: 50
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const photoLogSchema = new mongoose.Schema({
    photoId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    comments: [{
        type: commentSchema
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

photoLogSchema.index({ photoId: 1 });

module.exports = mongoose.model('PhotoLog', photoLogSchema);
```

### 2. Create `routes/photolog.js`

```javascript
const express = require('express');
const router = express.Router();
const PhotoLog = require('../models/PhotoLog');

// Get all photos
router.get('/', async (req, res) => {
    try {
        const photos = await PhotoLog.find()
            .select('photoId title url category likes comments createdAt')
            .sort({ createdAt: -1 });

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

// Get single photo
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

// Initialize photo
router.post('/init', async (req, res) => {
    try {
        const { photoId, title, url, category } = req.body;

        if (!photoId || !title || !url) {
            return res.status(400).json({ message: 'photoId, title, and url are required' });
        }

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

// Like photo
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

// Unlike photo
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

// Add comment
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

// Get comments
router.get('/:photoId/comments', async (req, res) => {
    try {
        const photo = await PhotoLog.findOne({ photoId: req.params.photoId });
        
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

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

// Delete comment
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

// Admin: Delete photo
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

// Admin: Update photo
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

// Admin: Reset likes
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

// Admin: Clear all comments
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
```

### 3. Update `server.js`

Add this line with your other routes:

```javascript
app.use('/api/photolog', require('./routes/photolog'));
```

## Deployment Steps

1. **Add the files to your backend repository**:
   - Create `models/PhotoLog.js`
   - Create `routes/photolog.js`
   - Update `server.js` to include the PhotoLog route

2. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Add PhotoLog API routes"
   git push origin main
   ```

3. **Render will auto-deploy** (if you have auto-deploy enabled)
   - Or manually trigger a deploy from the Render dashboard

4. **Test the API**:
   - Visit: `https://portfoliobackend-a6ah.onrender.com/api/photolog`
   - Should return an empty array `[]` initially

5. **Frontend will auto-initialize**:
   - The frontend will automatically create the 4 photos when you first visit the PhotoLog section

## Verification

After deployment, check:
- ✅ `GET /api/photolog` returns photos
- ✅ `POST /api/photolog/:photoId/like` works
- ✅ `POST /api/photolog/:photoId/comment` works
- ✅ `GET /api/photolog/:photoId/comments` returns comments

## Troubleshooting

If you still get 404 errors:
1. Check Render logs for deployment errors
2. Verify the route is registered in server.js
3. Ensure MongoDB connection is working
4. Check that the PhotoLog model is properly exported

## Alternative: Local Testing

If you want to test locally first:
1. Clone your backend repository
2. Add the PhotoLog files
3. Run `npm install` and `npm start`
4. Test with `http://localhost:5001/api/photolog`
5. Once working, deploy to Render
