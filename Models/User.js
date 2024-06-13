
const db =require('../Config/DBconnection')

class UserModel{

    static async create(user){
        return new Promise(resolve=>{
            db.query("insert into users (name, email, password,role) values (?,?,?,?)",[user.name,user.email,user.password,user.role],(e,r)=>{
                if (!e)
                    resolve(true)
                else {
                    console.log("error",e)
                    resolve(false)
                }
                    
            })
        })
    }


    static async findOne(fieldName,fieldValue) {
       
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE ${fieldName} = ?`;
            db.query(sql, [fieldValue], (err, results) => {
                if (err) {
                    reject(err);
                    console.log(err)
                } else {
                    
                    resolve(results.length > 0 ? results[0] : null);
                }
            });
        });
    }

    static async creatToken(token,email){

        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO tokens (token, userEmail) VALUES (?, ?)';
            db.query(sql, [token, email], (err, result) => {
                if (err) {
                    reject(err);
                    console.log(err)
                    // console.log( " token value = "+token)
                } else {
                    resolve(result);
                }
            });

    });
    }

    static async deleteToken(token){
        return new Promise(resolve=>{
            db.query("delete from tokens where token=?",[token],(e,r)=>{
                if(e){
                    resolve(false)
                }
                else
                    resolve (true)
            })
        })
    }
    

    
}


module.exports=UserModel
