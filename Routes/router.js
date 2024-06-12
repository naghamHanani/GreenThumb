const express=require('express')
const ResourceController=require("../Controllers/ResourceController")
const UserController=require("../Controllers/UserController")
const { check } = require('express-validator')
const checkAuthMiddleware=require("../Middleware/checkAuth")


const router = require('express').Router()

router.get('/',(req,res,next)=>{
    res.send("hello")
})

router.get("/resources",ResourceController.getAllResources)
router.post("/resources",checkAuthMiddleware.checkAuth,ResourceController.addResource)
//the checker is a middlewear
router.post("/deleteresource",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],checkAuthMiddleware.checkAuth,ResourceController.deleteResource)
router.post("/editresources",checkAuthMiddleware.checkAuth,ResourceController.editResource)


router.post('/sign-up',UserController.signUp)
router.post('/log-in',UserController.logIn)





module.exports=router