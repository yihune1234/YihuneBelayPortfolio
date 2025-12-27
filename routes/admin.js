const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// Setup initial admin (one-time use)
router.post('/setup', async (req, res) => {
    try {
        const { username, password, setupKey } = req.body;
        
        if (setupKey !== process.env.SETUP_KEY) {
            return res.status(403).json({ message: 'Invalid setup key' });
        }

        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
        
        res.json({ 
            token, 
            admin: { 
                id: admin._id, 
                username: admin.username 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get admin profile
router.get('/profile', auth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password');
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update username
router.put('/username', auth, async (req, res) => {
    try {
        const { username } = req.body;
        
        const existingAdmin = await Admin.findOne({ username, _id: { $ne: req.adminId } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const admin = await Admin.findByIdAndUpdate(
            req.adminId,
            { username },
            { new: true }
        ).select('-password');

        res.json({ message: 'Username updated successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update password
router.put('/password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(req.adminId);
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
