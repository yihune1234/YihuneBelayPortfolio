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

// Index for faster queries
photoLogSchema.index({ photoId: 1 });

module.exports = mongoose.model('PhotoLog', photoLogSchema);
