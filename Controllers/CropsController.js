const CropModel = require('../Models/Crops');
const authenticate = require('../Middleware/checkAuth');

// Create a new crop
async function createCrop(req, res) {
    try {
        const id = await CropModel.create({ userId: req.user.userId, ...req.body }); // Use userId from req.user
        res.status(201).json({ id, ...req.body });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Find all crops by user
async function findAllCropsByUser(req, res) {
    try {
        const crops = await CropModel.findAllByUser(req.user.id);
        res.status(200).json(crops);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Find crop by ID
async function findCropById(req, res) {
    try {
        const crop = await CropModel.findById(req.params.id);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        res.status(200).json(crop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update a crop
async function updateCrop(req, res) {
    try {
        // Fetch the existing crop
        const existingCrop = await CropModel.findById(req.params.id);
        if (!existingCrop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // Merge existing data with new data from request body
        const updatedCropData = {
            ...existingCrop,
            ...req.body
        };

        // Update the crop with merged data
        const updated = await CropModel.update(req.params.id, updatedCropData);
        if (!updated) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // Fetch and return the updated crop
        const updatedCrop = await CropModel.findById(req.params.id);
        res.status(200).json({message:"Crop Updated Successfully",content:updatedCrop});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Delete a crop
async function deleteCrop(req, res) {
    try {
        const deleted = await CropModel.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        res.status(200).json({message:"Crop Deleted Successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createCrop,
    findAllCropsByUser,
    findCropById,
    updateCrop,
    deleteCrop
};
