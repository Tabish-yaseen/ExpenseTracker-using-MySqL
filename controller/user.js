const User=require('../model/user')
const bcrypt=require('bcryptjs')


exports.signUp=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body

        const saltRounds=10
        const hash = await bcrypt.hash(password, saltRounds);

         await User.create({name,email,password:hash})
                res.status(200).json("record inserted correctly")


    }catch(err){
        res.status(404).json({error:err })

    }
   
}

exports.logIn = async (req, res, next) => {
    try {
        const{useremail,userpassword}  = req.body

        const user = await User.findOne({ where: { email: useremail } });

        if (user) {
            const passwordMatch = await bcrypt.compare(userpassword, user.password);
            if (passwordMatch) {
                res.status(200).json({ message: "User logged in successfully" });
            } else {
                res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

