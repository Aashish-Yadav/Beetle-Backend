const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



export const signUp = async (req,res) => {
    const {username,email,password} = req.body;

    if(!username || !email || !password) return res.status(400).json({status:400,message:"All Fields are required"});
    
    try{

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({status:400 , message:"User already exist"});

            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = new User({username,email,password:hashedPassword})
            await newUser.save();
            
            res.status(201).json({status:201,message:"User Registered Successfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:500, message:"Server Error"})
    }
}