const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    },DOB:{
        type:Number,
        required:true
    }
    
},{
    timestamps:true
})

module.exports = mongoose.model('Users',userSchema);