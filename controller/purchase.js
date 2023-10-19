const Order = require('../model/order');
const Razorpay = require('razorpay');
// require('dotenv').config();

const rzp = new Razorpay({
  key_id: 'rzp_test_MIejm69akLQiUR',
  key_secret:'tX78m1ySaPedGtwC7etsbpzm'
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
   const promise1=await order.update({paymentid:paymentId,status:'successful'})
    const promise2=await user.update({isPremium:true})
    Promise.all([promise1,promise2]).then(()=>{
      res.status(200).json({success:true,message:"Transaction successful"})

    }).catch((err)=>{
      throw new Error(err)
    })

  

    }catch(err){
        res.status(500).json({error:err})
    }

}