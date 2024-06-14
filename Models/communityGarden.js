const db = require('../Config/DBconnection')

class CommunityGarden {
    static create(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO CommunityGardens (name, location, availablePlots,growingConditions) VALUES (?, ?, ?, ?)';
            db.query(query, [data.name, data.location, data.availablePlots, data.growingConditions], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CommunityGardens';
            db.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CommunityGardens WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE CommunityGardens SET name = ?, location = ?, availablePlots = ?, growingConditions = ? WHERE id = ?';
            db.query(query, [data.name, data.location, data.availablePlots, data.growingConditions, data.id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM CommunityGardens WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    }
}

module.exports = CommunityGarden;
