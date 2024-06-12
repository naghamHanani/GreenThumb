const models=require('../Models')
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")


function signUp(req,res){

    models.User.findOne({where : {email : req.body.email}}).then(result=>{
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
                    password: hash
            
                }
            
                models.User.creat(user).then(result=>{
                    res.status(201).json({
                        message: "User created succesfully!"
                       
                    })
                }).cathc(error=>{
                    res.status(500).json({
                        message: "An error accured!"
                       
                    })
                })
            })
        })
    })


}


function logIn(req,res){
    models.user.findOne({where : {email : req.body.email} }).then(user=>{
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

                    },process.env.JWT_KEY,function(err,token){
                        res.status(200).json({
                            message : "Login successful!",
                            token : token
                           
                        })
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

module.exports = {
    signUp :signUp,
    logIn : logIn
}