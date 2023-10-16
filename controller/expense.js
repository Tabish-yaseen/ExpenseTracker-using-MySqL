const Expense=require('../model/expense')

exports.addExpenses=async(req,res,next)=>{
    try{
        const{amount,description,category}=req.body
        const product= await Expense.create({amount,description,category})
        // console.log(expense)
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }

}

exports.getExpenses=async (req,res,next)=>{
    try{
        const expenses= await Expense.findAll()
        console.log(expenses)
        res.status(202).json(expenses)

    }catch(err){
        res.status(500).json(err)
    }
}