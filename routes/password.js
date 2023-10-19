const express=require('express')
const router=express.Router()
const passwordController=require('../controller/password')

router.get('/forgotpassword/:email',passwordController.forgotPassword)


module.exports=router