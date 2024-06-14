const { resolve } = require('path')
const db =require('../Config/DBconnection')




class LocalModel{

    static async getAllLocal(){
        return new Promise(resolve=>{
            console.log("inside get db")
            db.query("select * from localpartnership", [] ,(error,result)=>{
                if(!error)
                    resolve(result)
            })
        })
    }

    

    static getLocalById(idProduct, callback) {
        const sql = 'SELECT * FROM localpartnership WHERE idProduct = ?';
        db.query(sql, [idProduct], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]); // Assuming userId is unique, return the first result
        });
    } 





    static async addLocal(idProduct,Product,company,CostPrice,AdvertisementDuration){

        return new Promise(resolve=>{
            db.query("insert into localpartnership (idProduct,Product,company,CostPrice,AdvertisementDuration) values (?,?,?,?,?)",[idProduct,Product,company,CostPrice,AdvertisementDuration],(e,r)=>{
                if (!e)
                    resolve(true)
                else {
                    console.log("error",e)
                    resolve(false)
                }
                    
            })
        })
    }

   
    
    static deleteLocalById(idProduct, callback) {
        const sql = 'DELETE FROM localpartnership WHERE idProduct = ?';
        db.query(sql, [idProduct], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
    


    static updateLocalById(idProduct, updates, callback) {
        let updateString = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        let updateValues = Object.values(updates);
        updateValues.push(idProduct);

        const sql = `UPDATE localpartnership SET ${updateString} WHERE idProduct = ?`;

        db.query(sql, updateValues, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }


   

   



}


module.exports=LocalModel