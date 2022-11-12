// 1. Connect to the database 
// Catch any errors that may prop up

const mongoose = require('mongoose');


const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/todolist', {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false        
    });
        console.log("MongoDB connected successfully!");
    
    } catch (error) {
        console.log(err.message);

        process.exit(1);
    }
};

    module.exports = connectDB;