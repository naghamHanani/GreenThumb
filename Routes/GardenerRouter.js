
const express = require('express');
const router = express.Router();
const gardenerProfilesController = require('../Controllers/GardenerController');
const { checkAuth } = require('../Middleware/checkAuth');

router.post('/', checkAuth, gardenerProfilesController.create);
router.get('/', checkAuth, gardenerProfilesController.findByUserId);
router.put('/:id', checkAuth, gardenerProfilesController.update);
router.delete('/:id', gardenerProfilesController.remove);

module.exports = router;
