const express = require('express');
const mongoose = require('mongoose');
const userControl = require('./controllers/userControl');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT||5000;
app.use(express.json());
app.use(cookieParser);

app.get('/',(req,res)=>{
    res.json({msg:"This is trial"})

})
app.listen(PORT,()=>{
    console.log("Server is Running");
})
//routes
app.use('/user',userControl.signup)

//connecting MONGODB

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

connectDB();