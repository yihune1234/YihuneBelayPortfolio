const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, body: req.body });
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            console.log(`Login failed: User ${username} not found`);
            return res.status(400).json({ message: 'Admin user not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log(`Login failed: Incorrect password for ${username}`);
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, admin: { id: admin._id, username: admin.username } });
    } catch (err) {
        console.error('Login route error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Setup Initial Admin (One-time use or protected)
router.post('/setup-admin', async (req, res) => {
    const { username, password, setupKey } = req.body;
    if (setupKey !== process.env.SETUP_KEY) return res.status(403).json({ message: 'Unauthorized' });

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();
        res.json({ message: 'Admin created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Admin Account
const auth = require('../middleware/auth');
router.put('/update-account', auth, async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findById(req.adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        if (username) admin.username = username;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
        }

        await admin.save();
        res.json({ message: 'Account updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
