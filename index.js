const express=require("express")
const app=express()
const cors=require("cors")
const bodyParser = require("body-parser");
const server=require("http").createServer(app)
const connectin =require("./helpers/connection")
const auth=require("./routes/auth")
const teacahers=require("./routes/teachers")
const students=require("./routes/students")
const classes=require("./routes/classes")
const enrollments=require("./routes/enrollments")
const accounts=require("./routes/accounts")
const results=require("./routes/results")
const attendance=require("./routes/attendance")


require("dotenv").config()
app.use(express.json())
app.use(cors({
    origin:"*"
}))
connectin()
app.use(express.json())
// app.use(bodyParser.json());
app.use("/uetcs/",auth)
app.use("/uetcs/",teacahers)
app.use("/uetcs/",students)
app.use("/uetcs/",classes)
app.use("/uetcs/",enrollments)
app.use("/uetcs/",accounts)
app.use("/uetcs/",results)
app.use("/uetcs/",attendance)

server.listen(process.env.PORT,()=>{
    console.log("serevr is running at"+process.env.PORT )
})
