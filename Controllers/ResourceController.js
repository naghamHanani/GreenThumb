
const resourceModel=require('../Models/resource')
const {validationResult}=require("express-validator")
class ResourceController{

    static async getAllResources(req,res){
       var results = await resourceModel.getAllResources()
       if (results)
        res.send(results)
    }

    static async addResource(req,res){
        var name=req.body.name
        var type=req.body.type
        var availability=req.body.availability
        var ownerID=req.body.ownerID
        var x = await resourceModel.addResource(name,type,availability,ownerID)

        if(x==true)
            res.send("Added successfully!")
        else
            res.send("Failed to add!")

    }

    static async deleteResource(req,res){

        const id=req.body.id
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
    }
    static async editResource(req,res){
        const id=req.body.id
        const name=req.body.name
        const type=req.body.type
        const availability=req.body.availability
        const ownerID=req.body.ownerID

        
        var result=await resourceModel.editResource(id,name,type,availability,ownerID)
        
        if (result){
            res.send("Updated!")
        }
        else
            res.send("Failed to update!")
    }

}
module.exports=ResourceController