
const sib = require("sib-api-v3-sdk");
const User = require('../model/user');
require('dotenv').config();

exports.forgotPassword=async(req,res)=>{
    try {
        const userEmail = req.params.email;
        // const userEmail = await User.findOne({ where: { email: email } });

        // Create a Sendinblue email client
        const defaultClient = sib.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY
        const transEmailApi = new sib.TransactionalEmailsApi();

        const sender = {
            email: "tabishmir36@gmail.com",
            name: "Tabish"
        }

        const receiver = [
            {
                email:userEmail
            }
        ];

        // Send the password reset email
       const message=await transEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: "Password Reset",
            textContent:`click here to reset your password`
            
        })


        res.status(200).json({ message: message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};