const sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require('uuid');
const forgotPassword = require('../model/forgotPasswordRequest');
const User = require('../model/user');
const bcrypt=require('bcryptjs')
require('dotenv').config();

exports.forgotPassword = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const uuid = uuidv4();
    console.log(uuid);

    await forgotPassword.create({
      userId: user.id,
      uuid: uuid,
      isActive: true
    });

    // Create a Sendinblue email client
    const defaultClient = sib.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;
    const transEmailApi = new sib.TransactionalEmailsApi();

    const sender = {
      email: "tabishmir36@gmail.com",
      name: "Tabish"
    }

    const receiver = [
      {
        email: user.email
      }
    ];

    // Send the password reset email
    await transEmailApi.sendTransacEmail({
      sender,
      to: receiver,
      subject: "Password Reset",
      textContent: `<a href="http://localhost:3000/password/resetpassword/${uuid}">Reset password</a>`,
    });

    res.status(200).json({ message: 'Link to reset password sent to your mail' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const forgotPasswordRequest = await forgotPassword.findOne({ where: { uuid: uuid, isActive: true} });
    
    if (forgotPasswordRequest) {
      // Deactivate the request
      await forgotPasswordRequest.update({ isActive: false });

      // Display a form to reset the password
      res.send(`
        <html>
          <form action="/password/updatepassword/${uuid}" method="post">
            Enter new password: <input type="password" name="password"  required>
            <button type="submit">Reset password</button>
          </form>
        </html>
      `);
    } else {
      res.status(404).send('Password reset link is invalid or has already been used');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};
exports.updatePassword=async(req,res)=>{
    try{
        const uuid=req.params.uuid
        const newPassword=req.body.password

        const request=await forgotPassword.findOne({where:{uuid:uuid }})

        if(request){  
        const user=await User.findOne({where:{id:request.userId}})

        if(user){
            const saltRounds=10
        const hash = await bcrypt.hash(newPassword, saltRounds)

        await user.update({password:hash})

        res.status(201).send('Successfuly update the new password')

        }
    }

    }catch(err){
        return res.status(403).json({ error:err} )

        }
        
    
    }