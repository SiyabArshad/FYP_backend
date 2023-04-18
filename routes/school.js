const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {createSchool,updateSchool,getallschools,getschool}=require("../controllers/school")
//create school route
route.post(routesname.createschool,authenticate,createSchool)
route.post(routesname.disableschool,authenticate,updateSchool)
route.get(routesname.getallschool,authenticate,getallschools)
route.post(routesname.getschool,getschool)
//diable a admin route only admin can create

module.exports=route