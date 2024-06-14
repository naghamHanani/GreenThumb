const { resolve } = require('path')
const db =require('../Config/DBconnection')

class VolunteerModel{

    static async getAllVolunteer(){
        return new Promise(resolve=>{
            console.log("inside get db")
            db.query("select * from volunteer", [] ,(error,result)=>{
                if(!error)
                    resolve(result)
            })
        })
    }

    
    static getVolunteerById(id, callback) {
        const sql = 'SELECT * FROM volunteer WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]); // Assuming userId is unique, return the first result
        });
    } 



    static async getAllEvent(){
        return new Promise(resolve=>{

            db.query("select * from activity", [] ,(error,result)=>{
                if(!error)
                    resolve(result)
            })
        })
    }



    static getEventById(AID, callback) {
        const sql = 'SELECT * FROM activity WHERE AID = ?';
        db.query(sql, [AID], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]); // Assuming userId is unique, return the first result
        });
    } 



    static async addVolunteer(id,AID,Name){

        return new Promise(resolve=>{
            db.query("insert into volunteer (id,AID,Name) values (?,?,?)",[id,AID,Name],(e,r)=>{
                if (!e)
                    resolve(true)
                else {
                    console.log("error",e)
                    resolve(false)
                }
                    
            })
        })
    }

    static async addEvent(AID,ActivityName,Period_of_time,gardenID,Event_manage_id){

        return new Promise(resolve=>{
            db.query("insert into activity (AID,ActivityName,Period_of_time,gardenID,Event_manage_id) values (?,?,?,?,?)",[AID,ActivityName,Period_of_time,gardenID,Event_manage_id],(e,r)=>{
                if (!e)
                    resolve(true)
                else {
                    console.log("error",e)
                    resolve(false)
                }
                    
            })
        })
    }

    
   


    static deleteVolunteerById(id, callback) {
        const sql = 'DELETE FROM volunteer WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static deleteEventById(AID, callback) {
        const sql = 'DELETE FROM activity WHERE AID = ?';
        db.query(sql, [AID], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    


    static updateVolunteerById(id, updates, callback) {
        let updateString = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        let updateValues = Object.values(updates);
        updateValues.push(id);

        const sql = `UPDATE volunteer SET ${updateString} WHERE id = ?`;

        db.query(sql, updateValues, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static updateEventById(AID, updates, callback) {
        let updateString = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        let updateValues = Object.values(updates);
        updateValues.push(AID);

        const sql = `UPDATE activity SET ${updateString} WHERE AID = ?`;

        db.query(sql, updateValues, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }


   



}


module.exports=VolunteerModel