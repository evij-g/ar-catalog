const mongoose = require('mongoose');

const { MONGODB_URL } = process.env;

async function connectDB(){
    try{
        const { connection } = await mongoose.connect(MONGODB_URL)
        console.log(`connected to MongoDB: ${connection.name}`)
    }catch(error){
     console.error(`An error occured while trying to connect to MongoDB ${error.message}`)
    };
}


module.exports = { connectDB }