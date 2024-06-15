const db = require('../Config/DBconnection');

class GardenerProfileModel {
    static create(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO GardenerProfiles (name, email, experienceLevel, favoritePlants) VALUES (?, ?, ?, ?)';
            db.query(query, [data.name, data.email, data.experienceLevel, data.favoritePlants], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }

    static findByUserId(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM GardenerProfiles WHERE userId = ?';
            db.query(query, [userId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }

    static update(userId, data) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE GardenerProfiles SET name = ?, email = ?, experienceLevel = ?, favoritePlants = ? WHERE userId = ?';
            db.query(query, [data.name, data.email, data.experienceLevel, data.favoritePlants, userId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows > 0);
            });
        });
    }

    static delete(userId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM GardenerProfiles WHERE userId = ?';
            db.query(query, [userId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows > 0);
            });
        });
    }
}

module.exports = GardenerProfileModel;
