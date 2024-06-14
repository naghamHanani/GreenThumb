const express=require('express')
const router = require('express').Router()

const Lcont = require('../Controllers/LocalPartnershipController')


//view all Local
router.get('/getLocal',Lcont.getAllLocal)
 
//view specific Local
router.get('/getLocal/:idProduct', Lcont.getLocalById);

//add Local
router.post('/addLocal',Lcont.addLocal)

//delete Local
router.delete('/deleteLocal/:idProduct',Lcont.deleteLocal)

//edit Local
router.patch('/editLocal/:idProduct', Lcont.updateLocal)


module.exports=router