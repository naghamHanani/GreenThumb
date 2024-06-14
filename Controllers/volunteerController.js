
const { resolve } = require('path')
const VolunteerModel=require('../Models/volunteerdb')
const {validationResult}=require("express-validator")
const userModel=require('../Models/User')
class VolunteerController{

    static async getAllVolunteer(req,res){
       
       var results = await VolunteerModel.getAllVolunteer()
       
       if (results)
        res.send(results)
       else{
        res.status(500).json({ error: 'Internal server error.' })
       }
    }

    static getVolunteerById(req, res) {
        const id = req.params.id;

        VolunteerModel.getVolunteerById(id, (err, user) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (!user) {
                res.status(404).send(`User with ID ${id} not found`);
                return;
            }
            res.json(user);
        });
    }


    static async getAllEvent(req,res){
        var results = await VolunteerModel.getAllEvent()
        if (results)
         res.send(results)
        else{
            res.status(500).json({ error: 'Internal server error.' })
           }

     }



     static getEventById(req, res) {
        const AID = req.params.AID;

        VolunteerModel.getEventById(AID, (err, user) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (!user) {
                res.status(404).send(`User with ID ${AID} not found`);
                return;
            }
            res.json(user);
        });
    }


    static async addVolunteer(req,res){
        
        var id =req.body.id
        var AID=req.body.AID
        var Name=req.body.Name
       
        var x = await VolunteerModel.addVolunteer(id,AID,Name)

        if(x==true) 
            res.send("Added successfully!")
        else
            res.send("Failed to add!")

    }

    static async addEvent(req,res){
        
        
        var AID=req.body.AID
        var ActivityName=req.body.ActivityName
        var Period_of_time=req.body.Period_of_time
        var gardenID=req.body.gardenID
        var Event_manage_id=req.body.Event_manage_id
       
        var x = await VolunteerModel.addEvent(AID,ActivityName,Period_of_time,gardenID,Event_manage_id)

        if(x==true) 
            res.send("Added successfully!")
        else
            res.send("Failed to add!")

    }



  



static deleteVolunteer(req, res) {
    const id = req.params.id;
    const email = req.user.email;

    userModel.findOne('email',email).then(async user=>{
        db.query('select id from users where email=?',[email],async (er,rest)=>{
         
                if(rest[0].role=='admin'){
                
                    VolunteerModel.deleteVolunteerById(id, (err, result) => {
                        if (err) {
                            console.error('Error deleting user:', err);
                            res.status(500).send('Internal Server Error');
                            return;
                        }
                        res.send(`User with ID ${id} deleted successfully`);
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
static deleteEvent(req, res) {
    const AID = req.params.AID;
    const email = req.user.email;
    userModel.findOne('email',email).then(async user=>{
        db.query('select id from users where email=?',[email],async (er,rest)=>{
            
                if(rest[0].role=='admin'){
                    VolunteerModel.deleteEventById(AID, (err, result) => {
                        if (err) {
                            console.error('Error deleting user:', err);
                            res.status(500).send('Internal Server Error');
                            return;
                        }
                        res.send(`Activity with ID ${AID} deleted successfully`);
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
static updateVolunteer(req, res) {
    const id = req.params.id;
    const updates = req.body;
    const email = req.user.email;

userModel.findOne('email',email).then(async user=>{
    db.query('select id from users where email=?',[email],async (er,rest)=>{
        
            if(rest[0].role=='admin'){
            
                VolunteerModel.updateVolunteerById(id, updates, (err, result) => {
                    if (err) {
                        console.error('Error updating user:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.send(`User with ID ${id} updated successfully`);
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
static updateActivity(req, res) {
    const AID = req.params.AID;
    const updates = req.body;
    const email = req.user.email;


    userModel.findOne('email',email).then(async user=>{
        db.query('select id from users where email=?',[email],async (er,rest)=>{
            
                if(rest[0].role=='admin'){
                    VolunteerModel.updateEventById(AID, updates, (err, result) => {
                        if (err) {
                            console.error('Error updating user:', err);
                            return res.status(500).send('Internal Server Error');
                        }
                        res.send(`Activity with ID ${AID} updated successfully`);
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



module.exports=VolunteerController