const express=require('express')
const router=express.Router()
const passwordController=require('../controller/password')

router.get('/forgotpassword/:email',passwordController.forgotPassword)
router.get('/resetpassword/:uuid',passwordController.resetPassword)

router.post('/updatepassword/:uuid',passwordController.updatePassword)


module.exports=router