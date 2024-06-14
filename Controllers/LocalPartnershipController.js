const { resolve } = require('path')
const LocalModel=require('../Models/LocalPartnershipdb')
const {validationResult}=require("express-validator")
const userModel=require('../Models/User')
class LocalController{

    static async getAllLocal(req,res){
       
       var results = await LocalModel.getAllLocal()
        

       if (results)
        res.send(results)
       else{
        res.status(500).json({ error: 'Internal server error.' })
       }
    }
  

    static getLocalById(req, res) {
        const idProduct= req.params.idProduct;

        LocalModel.getLocalById(idProduct, (err, user) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (!user) {
                res.status(404).send(`User with ID ${idProduct} not found`);
                return;
            }
            res.json(user);
        });
    }



     


    static async addLocal(req,res){
        
        var idProduct =req.body.idProduct
        var Product=req.body.Product
        var company=req.body.company
        var CostPrice=req.body.CostPrice
        var AdvertisementDuration=req.body.AdvertisementDuration
       
        var x = await LocalModel.addLocal(idProduct,Product,company,CostPrice,AdvertisementDuration)

        if(x==true) 
            res.send("Added successfully!")
        else
            res.send("Failed to add!")

    }




  

    //
    static deleteLocal(req, res) {
        const idProduct = req.params.idProduct;
        const email = req.user.email;


userModel.findOne('email',email).then(async user=>{
    db.query('select id from users where email=?',[email],async (er,rest)=>{
        
            if(rest[0].role=='admin'){
                LocalModel.deleteLocalById(idProduct, (err, result) => {
                    if (err) {
                        console.error('Error deleting user:', err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    res.send(`product with ID ${idProduct} deleted successfully`);
                });

        }else{
            console.log(rest)
            res.send("Only the Admin is allowed to delete!")
        }


})
}).catch(e=>{
res.send("Youre not logged in")
})    



    }


    //








//
static updateLocal(req, res) {
    const idProduct = req.params.idProduct;
    const updates = req.body;
    const email = req.user.email;


    userModel.findOne('email',email).then(async user=>{
        db.query('select id from users where email=?',[email],async (er,rest)=>{
            
                if(rest[0].role=='admin'){
                    LocalModel.updateLocalById(idProduct, updates, (err, result) => {
                        if (err) {
                            console.error('Error updating user:', err);
                            return res.status(500).send('Internal Server Error');
                        }
                        res.send(`product with ID ${idProduct} updated successfully`);
                    });
    
    
            }else{
                console.log(rest)
                res.send("Only the Admin is allowed to delete!")
            }
    
    
    })
    }).catch(e=>{
    res.send("Youre not logged in")
    })    



}


//



}



module.exports=LocalController