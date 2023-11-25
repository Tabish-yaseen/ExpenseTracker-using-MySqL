const Order = require('../models/order');
const jwt=require('jsonwebtoken')
const Razorpay = require('razorpay');
require('dotenv').config();

function generateAccessToken(id,name,ispremium){
  return jwt.sign({userid:id,username:name,isPremium:ispremium},process.env.SECRET_KEY
      )
}

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
});

exports.purchasePremium = async (req, res) => {
  try {
    const user = req.user;

    // Create an order with the specified amount and currency
    const order = await rzp.orders.create({
      amount: 50000, // Amount in the smallest currency unit (e.g., paise in INR)
      currency: 'INR',
    });

    // Use the magic method to create an associated order
    const createdOrder = await user.createOrder({
      orderid: order.id,
      status: 'PENDING',
    });

    return res.status(201).json({ order: order, key_id: rzp.key_id });
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.updateTransaction=async(req,res)=>{
    try{
        const{orderId,paymentId}=req.body
        const user=req.user
      const order=  await  Order.findOne({where:{orderid:orderId}})

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
   const promise1= order.update({paymentid:paymentId,status:'successful'})
    const promise2= user.update({isPremium:true})
    Promise.all([promise1,promise2]).then(()=>{
      res.status(200).json({success:true,message:"Transaction successful",token:generateAccessToken(user.id,undefined,true)})

    }).catch((err)=>{
      throw new Error(err)
    })

  

    }catch(err){
        res.status(500).json({error:err})
    }

}