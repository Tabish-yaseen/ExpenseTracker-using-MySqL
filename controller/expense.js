const Expense=require('../model/expense')
const User=require('../model/user')

function isStringNotValid(string){
    if(string===undefined || string.length===0){
        return true
    }
    else{
        return false
    }
}

exports.addExpenses=async(req,res)=>{
    try{
        const user=req.user
        const{amount,description,category}=req.body
        if(isStringNotValid(amount) || isStringNotValid(description) || isStringNotValid(category)){
            return res.status(400).json({error:"something is missing"})

        }
     
        const expense= await user.createExpense({amount,description,category})
         const totalAmount=Number(user.totalExpenses)+Number(amount)
         await User.update({
            totalExpenses:totalAmount},
            {where:{id:user.id}})
        res.status(200).json(expense)
    }catch(err){
        res.status(500).json(err)
    }

}

exports.getExpenses=async (req,res)=>{
    try{
        const user=req.user
        const expenses= await user.getExpenses()
        console.log(expenses)
        res.status(202).json(expenses)

    }catch(err){
        res.status(500).json({error: 'Failed to retrieve expenses'})
    }
}

exports.deleteExpense=async(req,res)=>{
    try{
        const user=req.user
    const id=req.params.id
    console.log("id",id)

    const expense=await Expense.findOne({where:{id:id,userId:user.id}})
    if(!expense){
        return res.status(404).json({ error: 'Expense not found' });
    }
    await expense.destroy()
    return res.status(200).json({message:'Successfully deleted the expense'})
    }catch(err){
        res.status(500).json({error:err})
    }

}