const express=require('express')
const router=express.Router()
const expenseController=require('../controllers/expense')
const userAuthentication=require('../middleware/auth')
const downloadController=require('../controllers/download')

// EXPENSE ROUTES
router.post('/expense',userAuthentication.authenticate,expenseController.addExpenses)
router.get('/expenses',userAuthentication.authenticate,expenseController.getExpenses )
router.get('/day-expenses',userAuthentication.authenticate,expenseController.getDayExpenses)
router.get('/month-expenses',userAuthentication.authenticate,expenseController.getMonthExpenses)
router.delete('/expense/:id',userAuthentication.authenticate,expenseController.deleteExpense)


//Download  Routes

router.get('/downloadExpenses',userAuthentication.authenticate,downloadController.downloadExpenses)
router.get('/getdownloadedURLS',userAuthentication.authenticate,downloadController.getURLS)


module.exports=router