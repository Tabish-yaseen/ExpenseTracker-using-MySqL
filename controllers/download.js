const Downloaded=require('../models/download')
const User=require('../models/user')
const Expense=require('../models/expense')
const s3Services=require('../services/s3services')
const sequelize=require('../util/database')


exports.downloadExpenses=async(req,res)=>{
    try{
        const user=req.user
    
        const expenses=await user.getExpenses()
        const stringifiedExpenses=JSON.stringify(expenses)
        const fileName=`Expense${user.id}/${new Date()}.txt`

       const fileURL= await s3Services.uploadToS3(stringifiedExpenses,fileName)

       await Downloaded.create({URL:fileURL,date:new Date(),userId:user.id})

       res.status(200).json({fileURL})

    }catch(err){
        res.status(500).json({fileURL:'',err:err})

    }
}
exports.getURLS=async(req,res)=>{
    try{
        const user=req.user
        // console.log(user)
        const downloadedFiles=await  Downloaded.findAll({where:{userId:user.id}})
        if(downloadedFiles.length===0){
           return res.status(400).json({error:"No Download History Available"})
        }
        res.status(200).json({downloadedFiles})

    }catch(err){
        res.status(500).json({err:err})
    }

}
