const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {CreateTeacher,updateTeacherprofile,deleteTeacher,TeacherProfile}=require("../controllers/teachers")

// route.post(routesname.signuproute,authenticate,CreateUser)
route.delete(routesname.deleteteacher,authenticate,deleteTeacher)
route.get(routesname.getspecificteacher,authenticate,TeacherProfile)
route.put(routesname.updateteacher,authenticate,updateTeacherprofile)
route.post(routesname.createteacher,authenticate,CreateTeacher)
module.exports=route