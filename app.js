const express= require('express')
const mydb=require('./Config/DBconnection')
const app=express();

const resRouter=require('./Routes/ResourcesRouter')
const userRoute=require('./Routes/AuthenticationRouter')
const bodyparser=require('body-parser')
const {check}=require("express-validator")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res,next)=>{
    res.send("hello")
})

app.use('/resources',resRouter)

app.post('/sign-up',userRoute)
app.post('/log-in',userRoute)
app.post('/log-out',userRoute)

app.listen(3001,()=>{
    console.log("Server is running")
}
)