const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({
            status: 400, 
            message: "All fields are required"
        });
    }
   
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 400, 
                message: "User already exists"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
           
        res.status(201).json({
            status: 201,
            message: "User registered successfully"
        });
    } catch (error) {
        console.log("Error during signup:", error);
        res.status(500).json({
            status: 500, 
            message: "Server error"
        });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: "All fields are required"
        });
    }
    
    try {
        const existingUser = await User.findOne({ email }); // Added await
        if (!existingUser) {
            return res.status(400).json({
                status: 400, 
                message: "User doesn't exist"
            });
        }
       
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); // Added await
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: 400, 
                message: "Incorrect password"
            });
        }
        
        const token = jwt.sign({
            username: existingUser.username,
            ID: existingUser._id,
            email: existingUser.email,
            role: existingUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" });
        
        res.status(200).json({
            status: 200, 
            message: "Logged in successfully",
            token: token, // Include token in response
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    } catch (error) {
        console.log("Error while signing in:", error);
        res.status(500).json({
            status: 500, 
            message: "Error while signing in"
        });
    }
};

module.exports = {
    signUp,
    signIn
};