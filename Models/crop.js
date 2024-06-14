const db = require('../Config/DBconnection')

class Crop {
    static create(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Crops (userId, name, plantingDate, harvestDate, notes) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [data.userId, data.name, data.plantingDate, data.harvestDate, data.notes], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });
    }

    static findAllByUser(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Crops WHERE userId = ?';
            db.query(query, [userId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Crops WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Crops SET name = ?, plantingDate = ?, harvestDate = ?, notes = ? WHERE id = ?';
            db.query(query, [data.name, data.plantingDate, data.harvestDate, data.notes, id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Crops WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    }
}

module.exports = Crop;
