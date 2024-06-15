const db = require('../Config/DBconnection');

class CropModel {
    static async create(data) {
        const query = 'INSERT INTO Crops (userId, name, plantingDate, harvestDate, notes) VALUES (?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [data.userId, data.name, data.plantingDate, data.harvestDate, data.notes], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }

    static async findAllByUser(userId) {
        const query = 'SELECT * FROM Crops WHERE userId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [userId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static async findById(id) {
        const query = 'SELECT * FROM Crops WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.length ? results[0] : null);
            });
        });
    }

    static async update(id, data) {
        const query = 'UPDATE Crops SET name = ?, plantingDate = ?, harvestDate = ?, notes = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.plantingDate, data.harvestDate, data.notes, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows > 0);
            });
        });
    }

    static async delete(id) {
        const query = 'DELETE FROM Crops WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows > 0);
            });
        });
    }
}

module.exports = CropModel;
