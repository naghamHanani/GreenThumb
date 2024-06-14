
const resourceModel=require('../Models/resource')
const userModel=require('../Models/User')
const {validationResult}=require("express-validator")
const db =require('../Config/DBconnection')
class ResourceController{

    static async getAllResources(req,res){
       var results = await resourceModel.getAllResources()
       if (results)
        res.send(results)
       else{
        res.status(500).json({ error: 'Internal server error.' })
       }
    }

    static async addResource(req,res){

        const email = req.user.email;
        
        if(email) {
       
        try{
        const { name, type, availability, ownerID } = req.body;

        if (!name || !type || !ownerID || (availability==null) ){
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        else{
        const user = await userModel.findOne('id', ownerID);
        if (!user) {
            return res.status(404).json({ error: 'The owner is not a registered user!' });
        }
        else{
        var x = await resourceModel.addResource(name,type,availability,ownerID)

        if(x==true)
            res.send("Added successfully!")
        else
            res.send("Failed to add!")
        }
    }
      }catch(error){
        console.error('Error adding resource:', error);
        res.status(500).json({ error: 'Internal server error.' });
      } 
       
    }
    else{
        res.send("You are not logged in!")
        console.log("not logged in")
    }
    }

    static async deleteResource(req,res){
        const id=req.params.id;
        const email = req.user.email;
        
        userModel.findOne('email',email).then(async user=>{

            db.query('select id , role from users where email=?',[email],async (er,rest)=>{     
                db.query('select ownerID from resources where id=?',[id],async(e,re)=>{           
                    if((parseInt(re[0].ownerID) === rest[0].id) || (rest[0].role=='admin')){
                        console.log(er,rest)
                    const error=validationResult(req)
                     if(!error.isEmpty()){
                        res.json(error.array())
                    }else{
                    if(id){
                        var result=await resourceModel.deleteResource(id)
                    }
                    if (result){
                        res.send("Deleted!")
                    }
                    else
                        res.send("Failed to delete!")
                    }
                }else{
                    console.log(re,rest)
                    res.send("Only the owner is allowed to delete!")
                }})
            

        })
    }).catch(e=>{
        res.send("Youre not logged in")
    })    
    }
   

    static async editResource(req,res){
        
        const id=req.params.id;
        const email = req.user.email;
        const updateFields=req.body
        const fieldNames = Object.keys(updateFields);
        const fieldValues = Object.values(updateFields);


        let sql = 'UPDATE resources SET ';
        for (let i = 0; i < fieldNames.length; i++) {
          sql += `${fieldNames[i]} = ?`;
          if (i < fieldNames.length - 1) {
            console.log(fieldNames[i])
            sql += ', ';
          }
        }
        sql += ' WHERE id = ?';
      
        fieldValues.push(id); 


        userModel.findOne('email',email).then(async user=>{

            db.query('select id , role from users where email=?',[email],async (er,rest)=>{
                db.query('select ownerID from resources where id=?',[id],async(e,re)=>{
                    if((parseInt(re[0].ownerID) === rest[0].id)||(rest[0].role=='admin')){
                        db.query(
                            sql,
                            fieldValues,
                            (err, result) => {
                              if (err) {
                                console.error('Error updating resource:', err);
                                res.status(500).json({ error: 'Error updating resource' });
                                
                              }
                        
                              if (result.affectedRows === 0) {
                                 res.status(404).json({ message: 'Resource not found' });
                              }
                        
                              res.json({ message: 'Resource updated successfully' });
                            }
                        );
                }else{
                    console.log(re,rest)
                    res.send("Only the owner is allowed to delete!")
                }})
            

        })
    }).catch(e=>{
        res.send("Youre not logged in")
    })    
    }



    static async getResourceById(req,res){

        var results = await resourceModel.findOne('id',req.params.id)
       if (results)
        res.send(results)
       else{
        res.status(404).json({ error: 'Resource not found' })
       }
    }

}
module.exports=ResourceController