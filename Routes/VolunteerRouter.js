const express=require('express')
const router = require('express').Router()
const Vcont = require('../Controllers/volunteerController')




//view all volunteer
router.get('/',Vcont.getAllVolunteer)

//view specific volunteer
router.get('/:id', Vcont.getVolunteerById);

//add new volunteer
router.post('/',Vcont.addVolunteer)
 
//delete volunteer by id
router.delete('/:id',Vcont.deleteVolunteer)

//update volunteer
router.patch("/:id",Vcont.updateVolunteer)











module.exports=router