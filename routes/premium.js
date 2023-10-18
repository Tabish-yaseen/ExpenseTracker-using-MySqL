const express=require('express')
const router=express.Router()
const premiumController=require('../controller/premium')

router.get('/showleaderboard',premiumController.showLeaderBoard)

module.exports=router