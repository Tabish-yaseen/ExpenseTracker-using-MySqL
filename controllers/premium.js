const User=require('../models/user')
const Expense=require('../models/expense')
const sequelize = require('sequelize')


exports.showLeaderBoard=async(req,res)=>{
    try{
        const showLeaderBoardOfUsers=await User.findAll({
             order:[[sequelize.literal('totalExpenses'), 'DESC']]


        })
        if(showLeaderBoardOfUsers.length===0){
            return res.status(400).json({err:"No Leaderboard Till Now"})
        }
       
        res.status(200).json(showLeaderBoardOfUsers)

    }catch(err){
        res.status(500).json(err)
    }
}