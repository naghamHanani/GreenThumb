const express=require('express')
const router = require('express').Router()
const Vcont = require('../Controllers/volunteerController')




//view all event
router.get('/',Vcont.getAllEvent)

//view specific event
router.get('/:AID', Vcont.getEventById);

//add Event
router.post('/',Vcont.addEvent)

//delete Event
router.delete('/:AID',Vcont.deleteEvent)

//edit Event
router.patch('/:AID', Vcont.updateActivity);







module.exports=router