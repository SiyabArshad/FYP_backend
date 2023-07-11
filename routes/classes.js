const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {CreateClass,UpdateClass,DeleteClass,GetClassDetail,GetallClass, getClasseslist, ChangeClassTeacher}=require("../controllers/classes")
route.get(routesname.getallclasses,authenticate,GetallClass)
route.get(routesname.getoverallclasses,authenticate,getClasseslist)
route.delete(routesname.deleteclass,authenticate,DeleteClass)
route.get(routesname.getspecificclass,authenticate,GetClassDetail)
 route.put(routesname.updateclass,authenticate,UpdateClass)
 route.post(routesname.createclass,authenticate,CreateClass)
 route.put(routesname.changeclassteacher,authenticate,ChangeClassTeacher)

module.exports=route