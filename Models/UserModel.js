const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        default:"user",
    },
    hasPaid:{
        default:false,
    },
    profilePic:{
        type:String,
    },
    playList:[{
        type:mongoose.Schema.types.ObjectId,
        ref:'PlayList'
    }]
},{timestamps:true})

const User = mongoose.model(User,UserSchema)

module.exports = User;