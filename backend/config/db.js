const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://vanshgilhotra8885:abcd5632@cluster0.8800rew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDb connnected');
    }catch(error){
        console.log(error.message);
    }
}

module.exports = connectDB;