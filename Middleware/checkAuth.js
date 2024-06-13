const jwt=require("jsonwebtoken")

const JWT_SECRET_KEY = '16#18'; 

function checkAuth(req,res,next){
    try{
        const token =req.header.authorization.split(" ")[1] // will be sth like : Bearer @#fj3d#2vn3ke, so we need the 2nd part not the Bearer part [1] not [0] of the split result
        const decodedToken=jwt.verify(token,process.env.JWT_KEY)
        req.userData= decodedToken
        next()
    }catch(e){
        return res.status(401).json({
            "message": "Invalid or expired token provided!",
            "error" : e
        })

    }
}

module.exports={
    checkAuth : checkAuth,
    JWT_SECRET_KEY

}