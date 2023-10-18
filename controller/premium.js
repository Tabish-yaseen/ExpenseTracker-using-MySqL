const User=require('../model/user')
const Expense=require('../model/expense')


exports.showLeaderBoard=async(req,res)=>{
    try{
        let leadershipDetails=[]
        
        const users=await User.findAll()
        for(let user of users){
            const userid=user.id
            const username=user.name
            const expenses=await Expense.findAll({where:{userId:userid}})
            let totalAmount=0
            for(let expense of expenses){
                totalAmount+=expense.amount
               

            }
            leadershipDetails.push({userid:userid,name:username,totalcost:totalAmount})
        }
        leadershipDetails.sort((a, b) => b.totalcost - a.totalcost);
        res.status(200).json(leadershipDetails)
        
        

    }catch(err){
        console.log(err)
    }
}