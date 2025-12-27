const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create project (Admin only)
router.post('/', auth, upload.single('imageFile'), async (req, res) => {
    try {
        const projectData = { ...req.body };

        // If technologies is a string (from FormData), parse it
        if (typeof projectData.technologies === 'string') {
            try {
                projectData.technologies = JSON.parse(projectData.technologies);
            } catch (e) {
                projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
            }
        }

        if (req.file) {
            // Store the relative path to the image
            projectData.image = `/uploads/${req.file.filename}`;
        }

        const project = new Project(projectData);
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        console.error('Create project error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update project (Admin only)
router.put('/:id', auth, upload.single('imageFile'), async (req, res) => {
    try {
        const projectData = { ...req.body };

        // If technologies is a string (from FormData), parse it
        if (typeof projectData.technologies === 'string') {
            try {
                projectData.technologies = JSON.parse(projectData.technologies);
            } catch (e) {
                projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
            }
        }

        if (req.file) {
            projectData.image = `/uploads/${req.file.filename}`;
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
        res.json(updatedProject);
    } catch (err) {
        console.error('Update project error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete project (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
