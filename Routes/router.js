const express=require('express')
const router = require('express').Router()
const resRoute=require('../Routes/ResourcesRouter')
const userRoute=require('../Routes/AuthenticationRouter')

router.get('/',(req,res,next)=>{
    res.send("hello")
})



router.get("/resources",resRoute)
router.post("/resources",resRoute)
router.delete("/resources",resRoute)
router.patch("/resources",resRoute)


router.post('/sign-up',userRoute)
router.post('/log-in',userRoute)
router.post('/log-out',userRoute)





module.exports=router