const db = require('../Config/DBconnection');

class RatingModel {
    static async createRating(knowledgeId, userId, rating) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO ratings (knowledge_id, user_id, rating) VALUES (?, ?, ?)";
            db.query(sql, [knowledgeId, userId, rating], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async userHasRated(knowledgeId, userId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM ratings WHERE knowledge_id = ? AND user_id = ?";
            db.query(sql, [knowledgeId, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.length > 0);
                }
            });
        });
    }
}

module.exports = RatingModel;
