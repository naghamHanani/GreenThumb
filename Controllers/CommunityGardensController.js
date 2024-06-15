const userModel = require('../Models/User');
const communityGardenModel = require('../Models/CommunityGarden');
const authenticate = require('../Middleware/checkAuth');

// Create a community garden
async function createCommunityGarden(req, res) {
    const email = req.user.email;

    if (!email) {
        return res.status(401).json({ message: 'You are not logged in!' });
    }

    const { name, location, availablePlots, growingConditions, ownerID } = req.body;

    if (!name || !location || !ownerID || !availablePlots || !growingConditions) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
        const user = await userModel.findOne('id', ownerID);
        if (!user) {
            return res.status(404).json({ error: 'The owner is not a registered user!' });
        }

        const id = await communityGardenModel.create(req.body);
        res.status(201).json({message:"Garden Created Successfully",content: req.body});
    } catch (error) {
        res.status(400).json({ message: 'Error creating resource', error: error.message });
    }
}

// Retrieve all community gardens
async function findAllCommunityGardens(req, res) {
    try {
        const communityGardens = await communityGardenModel.findAll();
        res.status(200).json(communityGardens);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Retrieve a single community garden by ID
async function findCommunityGardenById(req, res) {
    try {
        const communityGarden = await communityGardenModel.findById(req.params.id);
        if (!communityGarden) {
            return res.status(404).json({ error: 'Community Garden not found' });
        }
        res.status(200).json(communityGarden);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update a community garden
async function updateCommunityGarden(req, res) {
    try {
        const updated = await communityGardenModel.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Community Garden not found' });
        }
        const updatedCommunityGarden = await communityGardenModel.findById(req.params.id);
        res.status(200).json({message:"Garden Updated Successfully",content:updatedCommunityGarden});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a community garden
async function deleteCommunityGarden(req, res) {
    const id = req.params.id;
    const email = req.user.email;

    try {
        const user = await userModel.findOne('email', email);
        const owner = await communityGardenModel.findById(id);

        if (!user || !owner) {
            return res.status(404).json({ error: 'User or Community Garden not found' });
        }

        if (owner.ownerID !== user.id && user.role !== 'admin') {
            return res.status(403).json({ message: 'Only the owner or an admin can delete this Community Garden' });
        }

        const deleted = await communityGardenModel.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Community Garden not found' });
        }

        res.status(200).json({message: "Garden Deleted Successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createCommunityGarden:createCommunityGarden,
    findAllCommunityGardens:findAllCommunityGardens,
    findCommunityGardenById:findCommunityGardenById,
    updateCommunityGarden:updateCommunityGarden,
    deleteCommunityGarden:deleteCommunityGarden
};
