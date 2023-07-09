const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {CreateStudent,updateStudentprofile,deleteStudent,StudentProfile,getStudents,getstudentcount}=require("../controllers/students")

route.get(routesname.getallstudents,authenticate,getStudents)
route.delete(routesname.deletestudent,authenticate,deleteStudent)
route.get(routesname.getspecificstudent,authenticate,StudentProfile)
route.put(routesname.updatestudent,authenticate,updateStudentprofile)
route.post(routesname.createstudent,authenticate,CreateStudent)
route.get(routesname.studentcount,authenticate,getstudentcount)
module.exports=route