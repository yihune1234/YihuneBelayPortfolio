const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { upload, cloudinaryUpload } = require('../middleware/upload');

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
router.post('/', auth, upload.single('imageFile'), cloudinaryUpload, async (req, res) => {
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

        if (req.file && req.file.cloudinaryUrl) {
            projectData.image = req.file.cloudinaryUrl;
        }

        const project = new Project(projectData);
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        console.error('Create project error:', err);
        res.status(400).json({ message: err.message });
    }
});
router.put('/:id',
    auth,
    upload.single('imageFile'),
    cloudinaryUpload,
    async (req, res) => {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const projectData = { ...req.body };

            // Parse technologies
            if (typeof projectData.technologies === 'string') {
                try {
                    projectData.technologies = JSON.parse(projectData.technologies);
                } catch {
                    projectData.technologies = projectData.technologies
                        .split(',')
                        .map(t => t.trim());
                }
            }

            // If new image uploaded
            if (req.file && req.file.cloudinaryUrl) {
                // 🔥 delete old image from cloudinary
                if (project.image?.public_id) {
                    await cloudinary.uploader.destroy(project.image.public_id);
                }

                projectData.image = {
                    url: req.file.cloudinaryUrl,
                    public_id: req.file.public_id
                };
            }

            const updatedProject = await Project.findByIdAndUpdate(
                req.params.id,
                projectData,
                { new: true }
            );

            res.json(updatedProject);
        } catch (err) {
            console.error('Update project error:', err);
            res.status(400).json({ message: err.message });
        }
    }
);

// Delete project (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete image from Cloudinary
        if (project.image?.public_id) {
            await cloudinary.uploader.destroy(project.image.public_id);
        }

        await project.deleteOne();
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
