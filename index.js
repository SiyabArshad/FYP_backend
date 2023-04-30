const express=require("express")
const app=express()
const cors=require("cors")
const server=require("http").createServer(app)
const connectin =require("./helpers/connection")
require("dotenv").config()
app.use(express.json())
app.use(cors())
connectin()
app.use(express.json())

server.listen(process.env.PORT,()=>{
    console.log("serevr is running at"+process.env.PORT )
})
