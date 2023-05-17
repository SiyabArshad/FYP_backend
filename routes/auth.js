const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {CreateUser,loginUser,AdminProfile,updateadminprofile,resetUser,PasswordLinkSend}=require("../controllers/authController")
//createUser route
route.post(routesname.signuproute,authenticate,CreateUser)
route.post(routesname.loginroute,loginUser)
route.get(routesname.getprofile,authenticate,AdminProfile)
route.put(routesname.updateprofile,authenticate,updateadminprofile)
route.put(routesname.resetUser,authenticate,resetUser)
route.post(routesname.passlink,PasswordLinkSend)
module.exports=route
