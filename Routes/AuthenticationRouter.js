const express=require('express')
const router = require('express').Router()

const UserController=require("../Controllers/UserController")
const {checkAuth}=require("../Middleware/checkAuth")


router.post('/sign-up',UserController.signUp)
router.post('/log-in',UserController.logIn)
router.post('/log-out',checkAuth,UserController.logOut)

module.exports=router