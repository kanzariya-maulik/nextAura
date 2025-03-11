const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        let user = new userModel({ fullname, email });
        user.password = await user.hashPassword(password);
        let createdUser = await user.save();
        
        let token = user.generateToken();
        res.cookie("token", token);

        delete createdUser._doc.password;

        res.status(201).json({ message: "User created successfully", user: createdUser });

    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: "Error creating user" });
    }
};


module.exports.loginUser = async (req,res)=>{
    try{
        let {email,password}=req.body;
        let user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        let isValidPassword=await user.matchPassword(password);
        if(!isValidPassword){
            return res.status(400).json({message:"Invalid email or password"});
        }

        let token=user.generateToken();
        res.cookie("token",token);
        
        delete user._doc.password;
        res.status(200).json({message:"User logged in successfully",user:user});
    }catch(e){
        console.error(e);
        return res.status(400).json({ message: "Error logging in user" });
    }
}