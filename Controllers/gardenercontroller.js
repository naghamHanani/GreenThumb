
const GardenerProfile = require('../Models/gardenerProfile');
const authenticate = require('../Middleware/checkAuth');

exports.create = [
    authenticate,
    async (req, res) => {
        try {
            const id = await GardenerProfile.create({ userId: req.user.id, ...req.body });
            res.status(201).json({ id, ...req.body });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.findByUserId = [
    authenticate,
    async (req, res) => {
        try {
            const profile = await GardenerProfile.findByUserId(req.user.id);
            if (!profile) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            res.status(200).json(profile);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.update = [
    authenticate,
    async (req, res) => {
        try {
            const updated = await GardenerProfile.update(req.user.id, req.body);
            if (!updated) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            const updatedProfile = await GardenerProfile.findByUserId(req.user.id);
            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.delete = [
    authenticate,
    async (req, res) => {
        try {
            const deleted = await GardenerProfile.delete(req.user.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];
