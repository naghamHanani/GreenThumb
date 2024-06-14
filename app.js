const express= require('express')
const mydb=require('./Config/DBconnection')
const app=express();
const route=require('./Routes/router')
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


    // app.get("/",(req,res,next)=>{
//     res.send("hello")
// })

app.use(route)

app.listen(3001,()=>{
    console.log("Server is running")
}
)