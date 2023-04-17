const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {createSchool,updateSchool}=require("../controllers/school")
//create school route
route.post(routesname.createschool,authenticate,createSchool)
route.post(routesname.disableschool,authenticate,updateSchool)
//diable a admin route only admin can create

module.exports=route