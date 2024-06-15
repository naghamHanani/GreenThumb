const db = require('../Config/DBconnection');

class CommunityGardenModel {
    static async create(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO CommunityGardens (name, location, availablePlots, growingConditions) VALUES (?, ?, ?, ?)';
            db.query(query, [data.name, data.location, data.availablePlots, data.growingConditions], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            });
        });
    }

    static async findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CommunityGardens';
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CommunityGardens WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.length ? result[0] : null);
            });
        });
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE CommunityGardens SET name = ?, location = ?, availablePlots = ?, growingConditions = ? WHERE id = ?';
            db.query(query, [data.name, data.location, data.availablePlots, data.growingConditions, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM CommunityGardens WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }
}

module.exports = CommunityGardenModel;
