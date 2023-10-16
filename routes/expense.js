const express=require('express')
const router=express.Router()
const expenseController=require('../controller/expense')


router.post('/add-expenses',expenseController.addExpenses)
router.get('/get-expenses',expenseController.getExpenses )

module.exports=router