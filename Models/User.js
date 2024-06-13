
const db =require('../Config/DBconnection')

class UserModel{

    static async create(user){
        return new Promise(resolve=>{
            db.query("insert into users (name, email, password) values (?,?,?)",[user.name,user.email,user.password],(e,r)=>{
                if (!e)
                    resolve(true)
                else {
                    console.log("error",e)
                    resolve(false)
                }m
                    
            })
        })
    }


    //findOne({where : {email : req.body.email} })
}
