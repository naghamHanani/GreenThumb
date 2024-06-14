const express= require('express')
const mydb=require('./Config/DBconnection')
const app=express();


const resRouter=require('./Routes/ResourcesRouter')
const userRoute=require('./Routes/AuthenticationRouter')
const trefleRouter=require('./Routes/TrefleRouter')

const bodyparser=require('body-parser')
const {check}=require("express-validator")



const communityGardensRoutes = require('./Routes/communityGardens');
const gardenerProfilesRoutes = require('./Routes/gardenerProfiles');
const cropRoutes = require('./Routes/crops');
const authRoutes = require('./Routes/checkAuth');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use('/community-gardens', communityGardensRoutes);
app.use('/gardener-profiles', gardenerProfilesRoutes);
app.use('/crops', cropRoutes);
app.use('/checkAuth', authRoutes);

app.get('/',(req,res,next)=>{
    res.send("hello")
})


app.use('/resources',resRouter)

app.use('/trefle',trefleRouter)

app.post('/sign-up',userRoute)
app.post('/log-in',userRoute)
app.post('/log-out',userRoute)

app.listen(3001,()=>{
    console.log("Server is running")
}
)