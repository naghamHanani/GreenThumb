const userModel=require('../Models/User')
const CommunityGarden = require('../Models/communityGarden');
const authenticate = require('../Middleware/checkAuth');

exports.create = [
    authenticate,
    async (req, res) => {

        const email = req.user.email;
         if(email) {

        try {
            const id = await CommunityGarden.create(req.body);
            if (!id.name || !id.location || !id.ownerID ||!id.availablePlots ||!id.growingConditions){
                return res.status(400).json({ error: 'Missing required fields.' });
            }
            else{
                const user = await userModel.findOne('id', id.ownerID);
                if (!user) {
                    return res.status(404).json({ error: 'The owner is not a registered user!' });
                }
                else{
                    var x = await CommunityGarden.create(name,location,availablePlots,growingConditions,ownerID)
            
                    if(x==true)
                        res.send("created successfully!")
                    else
                        res.send("Failed to create!")
                    }
                }
            res.status(201).json({ id, ...req.body });
        } catch (error) {
          
            res.status(400).json('Error creating resource:',{ error: error.message });
        }
    }
        else{
            res.send("You are not logged in!")
            console.log("not logged in")
        }


    }
];

exports.findAll = [
    authenticate,
    async (req, res) => {
        try {
            const communityGardens = await CommunityGarden.findAll();
            res.status(200).json(communityGardens);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.findOne = [
    authenticate,
    async (req, res) => {
        try {
            const communityGarden = await CommunityGarden.findById(req.params.id);
            if (!communityGarden) {
                return res.status(404).json({ error: 'Community Garden not found' });
            }
            res.status(200).json(communityGarden);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.update = [
    authenticate,
    async (req, res) => {
        try {
            const updated = await CommunityGarden.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({ error: 'Community Garden not found' });
            }
            const updatedCommunityGarden = await CommunityGarden.findById(req.params.id);
            res.status(200).json(updatedCommunityGarden);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.delete = [
    authenticate,
    async (req, res) => {

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
                        const deleted = await CommunityGarden.delete(req.params.id);
                    if (!deleted) {
                     return res.status(404).json({ error: 'Community Garden not found' });
                        }
                        res.status(204).send();
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

];
