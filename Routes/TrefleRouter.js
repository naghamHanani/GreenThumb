const express=require('express')
const router = require('express').Router()

const {checkAuth}=require("../Middleware/checkAuth")

const TrefleController=require('../Controllers/TrefleController')


router.get('/:q',checkAuth,TrefleController.searchPlantByQuery)
router.get('/plants/:id', checkAuth, TrefleController.getPlantById);



module.exports=router