const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {CreateTeacher,updateTeacherprofile,deleteTeacher,TeacherProfile,getTeachers,getteachercount, getTeacherslist}=require("../controllers/teachers")

route.get(routesname.getallteachers,authenticate,getTeachers)
route.delete(routesname.deleteteacher,authenticate,deleteTeacher)
route.get(routesname.getspecificteacher,authenticate,TeacherProfile)
route.put(routesname.updateteacher,authenticate,updateTeacherprofile)
route.post(routesname.createteacher,authenticate,CreateTeacher)
route.get(routesname.taechercount,authenticate,getteachercount)
route.get(routesname.getoverallteachers,authenticate,getTeacherslist)

module.exports=route