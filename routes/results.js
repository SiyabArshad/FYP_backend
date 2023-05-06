const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {CreateResults,deleteResult,UpdateResults,GetResultsByEnrolmentId}=require("../controllers/results")
route.get(routesname.getresultofaclass,authenticate,GetResultsByEnrolmentId)
route.delete(routesname.deleteresult,authenticate,deleteResult)
route.put(routesname.updateresult,authenticate,UpdateResults)
route.post(routesname.createresult,authenticate,CreateResults)
module.exports=route