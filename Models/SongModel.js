const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    genre:{
        type:String,
    },
    duration:{
        type:Number,
    },
    file:{
        type:String,
        require:true
    },
    coverart:{
        type:String,
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }
})

const Song = mongoose.model('Song', SongSchema)
module.exports = Song;