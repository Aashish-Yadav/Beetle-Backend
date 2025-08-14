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
        type:String,
        default:"user",
    },
    hasPaid:{
        type:Boolean,
        default:false,
    },
    profilePic:{
        type:String,
    },
    playList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PlayList'
    }]
},{timestamps:true})

const User = mongoose.model('User',UserSchema)

module.exports = User;