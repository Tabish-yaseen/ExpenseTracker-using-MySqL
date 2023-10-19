const User=require('../model/user')
const Expense=require('../model/expense')
const { findAll } = require('../model/order')
const sequelize = require('sequelize')


exports.showLeaderBoard=async(req,res)=>{
    try{
        const showLeaderBoardOfUsers=await User.findAll({
            attributes:['id','name',[sequelize.fn('sum',sequelize.col('amount')),'totalcost']],
            include:[{
                model:Expense,
                attributes:[]
            }],
            group:['id'],
            order:[[sequelize.literal('totalcost'), 'DESC']]


        })
       
        // console.log("titli",showLeaderBoardOfUsers)
        res.status(200).json(showLeaderBoardOfUsers)

       

        
        

    }catch(err){
        console.log(err)
    }
}