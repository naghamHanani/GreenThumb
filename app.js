const express= require('express')
const mydb=require('./Config/DBconnection')
const app=express();
const route=require('./Routes/router')

const bodyparser=require('body-parser')
const {check}=require("express-validator")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

    // app.get("/",(req,res,next)=>{
//     res.send("hello")
// })

app.use(route)

app.listen(3001,()=>{
    console.log("Server is running")
}
)