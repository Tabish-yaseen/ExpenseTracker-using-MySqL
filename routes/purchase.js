const express=require('express')
const router=express.Router()


const purchaseController=require('../controllers/purchase')
 const userAuthentication=require('../middleware/auth')

router.get('/premiummembership',userAuthentication.authenticate,purchaseController.purchasePremium)

router.post('/updatetransactionstatus',userAuthentication.authenticate,purchaseController.updateTransaction)
module.exports=router
