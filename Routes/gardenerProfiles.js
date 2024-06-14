
const express = require('express');
const router = express.Router();
const gardenerProfilesController = require('../Controllers/gardenercontroller');
const authenticate = require('../Middleware/checkAuth');

router.post('/', authenticate, gardenerProfilesController.create);
router.get('/', authenticate, gardenerProfilesController.findByUserId);
router.put('/:id', authenticate, gardenerProfilesController.update);
router.delete('/:id', authenticate, gardenerProfilesController.delete);

module.exports = router;
