const userModel=require('../Models/User')
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const { JWT_SECRET_KEY } = require('../Middleware/checkAuth');

function signUp(req,res){

    userModel.findOne({where : {email : req.body.email}}).then(result=>{
        if(result)
            res.status(409).json({
                    message: "Email already exists"
            })
    }).catch(error=>{
        bcryptjs.genSalt(10, function(e,salt){
            bcryptjs.hash(req.body.password, salt,function(e,hash){
    
                const user={
                    name : req.body.name,
                    email : req.body.email,
                    password: hash,
                    role : req.body.role
                
            
                }
            
                userModel.create(user).then(result=>{
                    res.status(201).json({
                        message: "User created succesfully!"
                       
                    })
                }).catch(error=>{
                    res.status(500).json({
                        message: "An error accured!"
                       
                    })
                })
            })
        })
    })


}


function logIn(req,res){
    userModel.findOne('email', req.body.email ).then(user=>{
        if(user==null){
            res.status(401).json({
                message: "Invalid information!"  
            })
        }
        else{
           bcryptjs.compare(req.body.password, user.password, function(err,result){
                if(result){
                    
                    const token= jwt.sign({
                        email : user.email,
                        userId : user.id,

                    },JWT_SECRET_KEY,function(err,token){
                        if (err || !token) {
                            
                            res.status(500).json({ message: err.message });
                        } else {
                            storeTokenInDatabase(user.email,token)
                        res.status(200).json({
                            message : "Login successful!",
                            toke:token
                            
                        });

                    }
                    });
                    
                    
  
                }else{
                    res.status(401).json({
                        message: "Invalid information!"  
                    })
                }
           })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "An error accured!"
           
        })
    })

}

function logOut(req,res){
    const token = req.header('Authorization');
    
    userModel.deleteToken(token).then(result=>{
     console.log('Token removed from the database');
     return res.status(200).json( {
        "message": "Logout successful!"
    })
    }).catch(error=>{
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while logging out' });
     
    })
    

}


function storeTokenInDatabase(email, token) {

    userModel.creatToken(token,email).then((result) => {
            console.log('Token stored in the "tokens" table:', result);
        })
        .catch((error) => {
            console.error('Error storing token:', error);
        });
}



module.exports = {
    signUp :signUp,
    logIn : logIn,
    logOut:logOut
}