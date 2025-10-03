require('dotenv').config()
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL);

mongoose.connection.on('connected',()=>{
    console.log(`Database connected successfully ...`)
})

mongoose.connection.on('error',(err)=>{
    console.log(`Database connection failed Error : ${err}`);
})

module.exports = mongoose