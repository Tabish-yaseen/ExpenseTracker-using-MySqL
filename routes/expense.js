const express=require('express')
const router=express.Router()
const expenseController=require('../controller/expense')
const userAuthentication=require('../middleware/auth')
const downloadController=require('../controller/download')

// EXPENSE ROUTES
router.post('/add-expenses',userAuthentication.authenticate,expenseController.addExpenses)
router.get('/get-expenses',userAuthentication.authenticate,expenseController.getExpenses )
router.delete('/delete-expense/:id',userAuthentication.authenticate,expenseController.deleteExpense)


//Download  Routes

router.get('/downloadExpenses',userAuthentication.authenticate,downloadController.downloadExpenses)
router.get('/getdownloadedURLS',userAuthentication.authenticate,downloadController.getURLS)


module.exports=router