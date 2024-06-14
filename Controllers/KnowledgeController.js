const knowledgeModel = require('../Models/Knowledge');
const rateModel = require('../Models/Rating');
const { knowledgeSchema } = require('../Validator/validation');
const Fuse = require('fuse.js');

// Function to share knowledge
async function shareKnowledge(req, res) {
    const { error } = knowledgeSchema.validate(req.body); // Validate the input
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const knowledgeData = {
        userID: req.user.userId, // Extracted from the token
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    try {
        const result = await knowledgeModel.create(knowledgeData);
        if (result) {
            res.status(201).json({ message: "Knowledge shared successfully!" });
        } else {
            res.status(500).json({ message: "Failed to share knowledge" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err });
    }
}
async function editKnowledgeContent(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        const result = await knowledgeModel.updateContentAndTime(id, content);
        if (result) {
            res.status(200).json({ message: 'Knowledge content updated successfully' });
        } else {
            res.status(404).json({ message: 'Knowledge not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', error: err });
    }
}
async function deleteKnowledge(req, res) {
    const { id } = req.params;

    try {
        const knowledgeEntry = await knowledgeModel.findById(id);
        if (!knowledgeEntry) {
            return res.status(404).json({ message: 'Knowledge entry not found' });
        }

        if (knowledgeEntry.userID !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized. You do not have permission to delete this knowledge entry' });
        }

        const deleted = await knowledgeModel.delete(id);
        if (deleted) {
            res.status(200).json({ message: 'Knowledge entry deleted successfully' });
        } else {
            res.status(500).json({ message: 'Failed to delete knowledge entry' });
        }
    } catch (err) {
        console.error('Error deleting knowledge entry:', err);
        res.status(500).json({ message: 'An error occurred while deleting the knowledge entry', error: err });
    }
}
async function addRating(req, res) {
    const { knowledgeId, rating } = req.body;
    const userId = req.user.userId; // Assuming you have the userId in the JWT payload

    // Validate the rating
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be an integer between 1 and 5' });
    }

    try {
        // Check if the user is trying to rate their own knowledge
        const knowledge = await knowledgeModel.findById(knowledgeId);
        if (!knowledge) {
            return res.status(404).json({ message: "Knowledge not found" });
        }

        if (knowledge.userID === userId) {
            return res.status(403).json({ message: "You cannot rate your own knowledge" });
        }

        // Check if the user has already rated this knowledge entry
        const hasRated = await rateModel.userHasRated(knowledgeId, userId);
        if (hasRated) {
            return res.status(403).json({ message: "You have already rated this knowledge entry" });
        }

        // Add the rating to the database
        await rateModel.createRating(knowledgeId, userId, rating);

        // Update the total rating and number of ratings in the knowledge table
        await knowledgeModel.updateRating(knowledgeId);

        res.status(201).json({ message: "Rating added successfully" });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({ message: "An error occurred while adding rating" });
    }
}
async function searchKnowledge(req, res) {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const allKnowledge = await knowledgeModel.getAllKnowledge();

        const fuse = new Fuse(allKnowledge, {
            keys: ['title', 'content', 'author'],
            threshold: 0.3, // Adjust threshold as needed for fuzzy matching
        });

        const results = fuse.search(query);
        const formattedResults = results.map(result => result.item);

        res.status(200).json(formattedResults);
    } catch (error) {
        console.error('Error searching knowledge:', error);
        res.status(500).json({ message: 'An error occurred while searching knowledge' });
    }
}
module.exports = {
    shareKnowledge: shareKnowledge,
    editKnowledgeContent: editKnowledgeContent,
    deleteKnowledge: deleteKnowledge,
    addRating: addRating,
    searchKnowledge: searchKnowledge
};
