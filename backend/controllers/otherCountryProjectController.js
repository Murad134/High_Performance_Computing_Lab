const Project = require('../models/otherCountryProjectModel');

// GET all projects
async function getProjects(req, res) {
    try {
        const projects = await Project.getAllProjects();
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
}

// POST create new project
async function addProject(req, res) {
    try {
        const data = req.body;
        const result = await Project.createProject(data);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create project' });
    }
}

// PUT update project
async function updateProject(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Project.updateProject(id, data);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update project' });
    }
}

// DELETE project
async function deleteProject(req, res) {
    try {
        const id = req.params.id;
        await Project.deleteProject(id);
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete project' });
    }
}

module.exports = {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
};