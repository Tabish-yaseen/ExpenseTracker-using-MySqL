
const Expense=require('../model/expense')
const User=require('../model/user')

const sequelize=require('../util/database')



function isStringNotValid(string){
    if(string===undefined || string.length===0){
        return true
    }
    else{
        return false
    }
}



exports.addExpenses=async(req,res)=>{
    const transaction= await sequelize.transaction()
    const user=req.user
    
    try{
        const{amount,description,category}=req.body
        if(isStringNotValid(amount) || isStringNotValid(description) || isStringNotValid(category)){
            return res.status(400).json({error:"something is missing"})

        }
     
        const expense= await user.createExpense({amount,description,category},{transaction:transaction})
         const totalAmount=Number(user.totalExpenses)+Number(amount)
         await User.update({
            totalExpenses:totalAmount
        },{
            where:{id:user.id},
            transaction:transaction
        })
        await transaction.commit()
        res.status(200).json(expense)
    }catch(err){
        await transaction.rollback()
        res.status(500).json({error:err})
    }

}

exports.getExpenses=async (req,res)=>{
    try {
        const page = Number(req.query.page) || 1;
        const itemsPerPage = 2;
    
        const user = req.user;
        
    
        const expenses = await user.getExpenses({
          offset:(page - 1) * itemsPerPage,
          limit: itemsPerPage
        });
    
        // total count of expenses of the user
        const totalCount = await user.countExpenses();
    
        const lastPage = Math.ceil(totalCount / itemsPerPage);
    
        res.status(200).json({
          expenses:expenses,
          pagination:{
            currentPage: page,
            hasNextPage: page < lastPage,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage:lastPage

          }
          
        });
      } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve expenses' });
      }
    }


exports.deleteExpense=async(req,res)=>{
    const transaction = await sequelize.transaction();
    try{
        const user=req.user
    const id=req.params.id

    const expense=await Expense.findOne({where:{id:id,userId:user.id},transaction})
    if(!expense){
        await transaction.rollback()
        return res.status(404).json({ error: 'Expense not found' });
    }
    const totalAmount= Number(user.totalExpenses) -Number(expense.amount)
    await User.update({
        totalExpenses:totalAmount
    },{
      where:{
        id:user.id
      },
      transaction 
    })
    await expense.destroy()

    await transaction.commit();
    return res.status(200).json({message:'Successfully deleted the expense'})
    }catch(err){
        await transaction.rollback()
        res.status(500).json({error:err})
    }

}