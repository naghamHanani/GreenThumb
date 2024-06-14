
const express = require('express');
const router = express.Router();
const cropController = require('../Controllers/cropController');
const authenticate = require('../Middleware/checkAuth');


router.post('/', authenticate, cropController.create);
router.get('/', authenticate, cropController.findAllByUser);
router.get('/', authenticate, cropController.findById);
router.put('/:id', authenticate, cropController.update);
router.delete('/:id', authenticate, cropController.delete);

module.exports = router;
