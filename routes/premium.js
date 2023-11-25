const express=require('express')
const router=express.Router()
const premiumController=require('../controllers/premium')

router.get('/showleaderboard',premiumController.showLeaderBoard)

module.exports=router