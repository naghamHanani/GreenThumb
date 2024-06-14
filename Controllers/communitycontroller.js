
const CommunityGarden = require('../models/communityGarden');
const authenticate = require('../Middleware/checkAuth');

exports.create = [
    authenticate,
    async (req, res) => {
        try {
            const id = await CommunityGarden.create(req.body);
            res.status(201).json({ id, ...req.body });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.findAll = [
    authenticate,
    async (req, res) => {
        try {
            const communityGardens = await CommunityGarden.findAll();
            res.status(200).json(communityGardens);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.findOne = [
    authenticate,
    async (req, res) => {
        try {
            const communityGarden = await CommunityGarden.findById(req.params.id);
            if (!communityGarden) {
                return res.status(404).json({ error: 'Community Garden not found' });
            }
            res.status(200).json(communityGarden);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.update = [
    authenticate,
    async (req, res) => {
        try {
            const updated = await CommunityGarden.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({ error: 'Community Garden not found' });
            }
            const updatedCommunityGarden = await CommunityGarden.findById(req.params.id);
            res.status(200).json(updatedCommunityGarden);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.delete = [
    authenticate,
    async (req, res) => {
        try {
            const deleted = await CommunityGarden.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Community Garden not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];
