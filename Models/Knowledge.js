const db = require('../Config/DBconnection');

class KnowledgeModel {
    static async create(knowledgeData) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO knowledge (userID, title, content, author) VALUES (?, ?, ?, ?)";
            db.query(sql, [knowledgeData.userID, knowledgeData.title, knowledgeData.content, knowledgeData.author], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static async updateContentAndTime(id, content) {
        return new Promise((resolve, reject) => {
            const updatedTime = new Date().toISOString(); // Get current time
            const sql = 'UPDATE knowledge SET content = ?, updated_at = ? WHERE id = ?';
            db.query(sql, [content, updatedTime, id], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.affectedRows === 0) {
                    resolve(false); // No rows updated, knowledge not found
                } else {
                    resolve(true); // Knowledge updated successfully
                }
            });
        });
    }
    static async findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM knowledge WHERE id = ?';
            db.query(sql, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.length ? result[0] : null);
                }
            });
        });
    }
    static async delete(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM knowledge WHERE id = ?';
            db.query(sql, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
    static async updateRating(knowledgeId) {
        return new Promise((resolve, reject) => {
            // Calculate the new average rating and update the knowledge table
            const sql = `
                UPDATE knowledge k
                JOIN (
                    SELECT knowledge_id, AVG(rating) as avgRating, COUNT(*) as numRatings
                    FROM ratings
                    WHERE knowledge_id = ?
                ) r ON k.id = r.knowledge_id
                SET k.total_rating = r.avgRating, k.num_Ratings = r.numRatings
                WHERE k.id = ?;
            `;
            db.query(sql, [knowledgeId, knowledgeId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static async getAllKnowledge() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM knowledge';
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}


module.exports = KnowledgeModel;
