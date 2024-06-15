const express = require('express');
const router = express.Router();
const communityGardenController = require('../Controllers/CommunityGardensController');
const {checkAuth} = require('../Middleware/checkAuth');

console.log(communityGardenController);
// Create a community garden
router.post('/', checkAuth, communityGardenController.createCommunityGarden);

// Retrieve all community gardens
router.get('/', checkAuth, communityGardenController.findAllCommunityGardens);

// Retrieve a single community garden by ID
router.get('/:id', checkAuth, communityGardenController.findCommunityGardenById);

// Update a community garden
router.put('/:id', checkAuth, communityGardenController.updateCommunityGarden);

// Delete a community garden
router.delete('/:id', checkAuth, communityGardenController.deleteCommunityGarden);

module.exports = router;
