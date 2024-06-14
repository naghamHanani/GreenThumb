const express=require('express')
const router = require('express').Router()

const Lcont = require('../Controllers/LocalPartnershipController')


//view all Local
router.get('/',Lcont.getAllLocal)
 
//view specific Local
router.get('/:idProduct', Lcont.getLocalById);

//add Local
router.post('/',Lcont.addLocal)

//delete Local
router.delete('/:idProduct',Lcont.deleteLocal)

//edit Local
router.patch('/:idProduct', Lcont.updateLocal)


module.exports=router