const Crop = require('../Models/crop');
const authenticate = require('../Middleware/checkAuth');

exports.create = [
    authenticate,
    async (req, res) => {
        try {
            const id = await Crop.create({ userId: req.user.id, ...req.body });
            res.status(201).json({ id, ...req.body });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.findAllByUser = [
    authenticate,
    async (req, res) => {
        try {
            const crops = await Crop.findAllByUser(req.user.id);
            res.status(200).json(crops);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.findById = [
    authenticate,
    async (req, res) => {
        try {
            const crop = await Crop.findById(req.params.id);
            if (!crop) {
                return res.status(404).json({ error: 'Crop not found' });
            }
            res.status(200).json(crop);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.update = [
    authenticate,
    async (req, res) => {
        try {
            const updated = await Crop.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({ error: 'Crop not found' });
            }
            const updatedCrop = await Crop.findById(req.params.id);
            res.status(200).json(updatedCrop);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.delete = [
    authenticate,
    async (req, res) => {
        try {
            const deleted = await Crop.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Crop not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];
