const { resolve } = require('path')
const db =require('../Config/DBconnection')

class ResourceModel{

    static async getAllResources(){
        return new Promise(resolve=>{

            db.query("select * from resources", [] ,(error,result)=>{
                if(!error)
                    resolve(result)
            })
        })
    }

    static async addResource(name,type,availability,ownerID){

        return new Promise(resolve=>{
            db.query("insert into resources (name, type, availability, ownerID) values (?,?,?,?)",[name,type,availability,ownerID],(e,r)=>{
                if (!e)
                    resolve(true)
                else {
                    console.log("error",e)
                    resolve(false)
                }
                    
            })
        })
    }


    static async deleteResource(id){
        return new Promise(resolve=>{
            db.query("delete from resources where id=?",[id],(e,r)=>{
                if(e){
                    resolve(false)
                }
                else
                    resolve (true)
            })
        })
    }
    
    // static async editResource(id,name,type,availability,ownerID){
    //     return new Promise(resolve=>{
    //     db.query("update resources set name=?, type=? , availability=?, ownerID=? where id=?",[name,type,availability,ownerID,id],(e,r)=>{
    //         if(!e)
    //             resolve(r)
    //     })
    // })
    // }
}

module.exports=ResourceModel