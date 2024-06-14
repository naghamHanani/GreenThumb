const express = require('express');
const router = require('express').Router()
const communityGardensController = require('../Controllers/communitycontroller');
const authenticate = require('../Middleware/checkAuth');

router.post('/', authenticate, communityGardensController.create);
router.get('/', authenticate, communityGardensController.findByUserId);
router.put('/:id', authenticate, communityGardensController.update);
router.delete('/:id', authenticate, communityGardensController.delete);


module.exports = router;


