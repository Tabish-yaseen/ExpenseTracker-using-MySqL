const User=require('../models/user')
const jwt=require('jsonwebtoken')
require('dotenv').config();
exports.authenticate=async(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        const userPayload=await jwt.verify(token,process.env.SECRET_KEY)

        const user=await User.findByPk(userPayload.userid)
        req.user=user
        next()
        

    }catch(err){
        res.status(401).json({ error: 'Authentication failed' });

    }

}