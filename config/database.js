
const mongoose = require("mongoose");

require('dotenv').config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
        //useNewUrlParser:true,
        //useUnifiedTopology:true

    .then( ()=> {
        console.log("Connected to DB Successfully");
    }) 
    .catch((err)=> {
        console.log('Connection to DB failed!');
        process.exit(1);
    });
}
