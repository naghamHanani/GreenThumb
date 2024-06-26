
const express= require('express')
const mydb=require('./Config/DBconnection')
const app=express();

const resRouter=require('./Routes/ResourcesRouter')
const userRoute=require('./Routes/AuthenticationRouter')
const knowledgeRouter=require('./Routes/KnowledgeRouter')
const weatherRouter=require('./Routes/WeatherRouter')
const trefleRouter=require('./Routes/TrefleRouter')
const VolunteerRouter=require('./Routes/VolunteerRouter')
const LocalRoute=require('./Routes/LocalRouter')
const EventRoute=require('./Routes/EventRouter')
const communityGardensRoutes = require('./Routes/CommunityGardensRouter')
const gardenerProfilesRoutes = require('./Routes/GardenerRouter');
const cropRoutes = require('./Routes/CropsRouter');

const bodyparser=require('body-parser')
const {check}=require("express-validator")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res,next)=>{
    res.send("hello")
})

app.use('/resources',resRouter)
app.use('/knowledge',knowledgeRouter)
app.use('/weather', weatherRouter);
app.use('/Volunteer',VolunteerRouter)
app.use('/Local',LocalRoute)
app.use('/Events',EventRoute)
app.use('/trefle',trefleRouter)
app.use('/community-gardens', communityGardensRoutes);
app.use('/gardener', gardenerProfilesRoutes);
app.use('/crops', cropRoutes);
app.post('/sign-up',userRoute)
app.post('/log-in',userRoute)
app.post('/log-out',userRoute)

app.listen(3001,()=>{
    console.log("Server is running")
}
)