const express=require('express')
const router = require('express').Router()

const UserController=require("../Controllers/UserController")


router.post('/sign-up',UserController.signUp)
router.post('/log-in',UserController.logIn)

module.exports=router