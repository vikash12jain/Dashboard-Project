const mongoose = require('mongoose');

const connectToDB = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
    }
    catch(error){
        console.error(error.message());
    }
}
module.exports = connectToDB;
