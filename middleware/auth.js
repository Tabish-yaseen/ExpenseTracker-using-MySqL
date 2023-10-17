const User=require('../model/user')
const jwt=require('jsonwebtoken')
exports.authenticate=async(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        const userPayload=await jwt.verify(token,'63f7b4d5c29a7f8e49d7c294bb0b9cb345992c2849ac2f3e6e3b2af956f0de5d')

        const user=await User.findByPk(userPayload.userid)
        req.user=user
        next()
        

    }catch(err){
        res.status(401).json({ error: 'Authentication failed' });

    }

}