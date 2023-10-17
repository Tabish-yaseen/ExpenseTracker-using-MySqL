const express=require('express')
const router=express.Router()
const expenseController=require('../controller/expense')
const userAuthentication=require('../middleware/auth')


router.post('/add-expenses',userAuthentication.authenticate,expenseController.addExpenses)
router.get('/get-expenses',userAuthentication.authenticate,expenseController.getExpenses )
router.delete('/delete-expense/:id',userAuthentication.authenticate,expenseController.deleteExpense)

module.exports=router