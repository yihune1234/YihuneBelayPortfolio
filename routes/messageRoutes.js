const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Public: Send message
router.post('/', async (req, res) => {
    const message = new Message(req.body);
    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin only: Get all messages
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin only: Mark message as read
router.patch('/:id/read', auth, async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin only: Delete message
router.delete('/:id', auth, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
