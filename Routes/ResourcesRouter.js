const express=require('express')
const ResourceController=require("../Controllers/ResourceController")

const { check } = require('express-validator')
const {checkAuth}=require("../Middleware/checkAuth")


const router = require('express').Router()



router.get("/resources",ResourceController.getAllResources)
router.post("/resources",ResourceController.addResource)//add checkAuthMiddleware.checkAuth,
//the checker is a middlewear
router.post("/deleteresource",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],ResourceController.deleteResource)
router.post("/editresources",ResourceController.editResource)
router.get("/",ResourceController.getAllResources)

router.get("/:id",ResourceController.getResourceById)

router.post("/",checkAuth,ResourceController.addResource) //user should add token in autherizatu=ion header

router.delete("/:id",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],checkAuth,ResourceController.deleteResource)

router.patch("/:id",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],checkAuth,ResourceController.editResource)







module.exports=router