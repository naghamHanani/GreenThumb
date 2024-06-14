const express = require('express');
const router = express.Router();
const { checkAuth } = require('../Middleware/checkAuth');
const knowledgeController = require('../Controllers/KnowledgeController');

// Route to share knowledge
router.post('/share', checkAuth, knowledgeController.shareKnowledge);
router.patch('/edit/:id', checkAuth, knowledgeController.editKnowledgeContent);
router.delete('/delete/:id', checkAuth, knowledgeController.deleteKnowledge);
router.post('/rate', checkAuth, knowledgeController.addRating);
router.get('/search', checkAuth, knowledgeController.searchKnowledge);


module.exports = router;
