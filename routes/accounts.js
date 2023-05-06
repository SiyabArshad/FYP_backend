const route=require("express").Router()
const routesname=require("../helpers/routes")
const {authenticate}=require("../middlewares/Authentication.js")
const {createOrUpdateAccountRecord,deleteStatement,getAllAccounts,getAccountsByTimeFrame}=require("../controllers/accounts")
route.get(routesname.gettransactionsdetail,authenticate,getAllAccounts)
route.delete(routesname.deletetransaction,authenticate,deleteStatement)
route.get(routesname.getspecifictransactionsdetailofadate,authenticate,getAccountsByTimeFrame)
route.post(routesname.createtransaction,authenticate,createOrUpdateAccountRecord)
module.exports=route