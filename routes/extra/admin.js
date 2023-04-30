const route=require("express").Router()
const routesname=require("../../helpers/routes")
const {createadmin,loginadmin}=require("../../controllers/admin")
const {authenticate}=require("../../middlewares/Authentication.js")
//login admin route
route.post(routesname.adminlogin,loginadmin)

//create a admin route only admin can create
route.post(routesname.createadmin,authenticate,createadmin)

module.exports=route