
const express = require('express');
const router = express.Router();
const cropController = require('../Controllers/CropsController');
const { checkAuth } = require('../Middleware/checkAuth');


router.post('/', checkAuth, cropController.createCrop);
router.get('/', checkAuth, cropController.findAllCropsByUser);
router.get('/', checkAuth, cropController.findCropById);
router.put('/:id', checkAuth, cropController.updateCrop);
router.delete('/:id', checkAuth, cropController.deleteCrop);

module.exports = router;
