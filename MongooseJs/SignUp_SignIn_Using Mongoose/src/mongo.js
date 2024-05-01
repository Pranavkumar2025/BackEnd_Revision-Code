const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/PranavFormPage").then(()=>{
    console.log("Connection Succesfull...");
}).catch((err)=>{
    console.log("Some Error in you Page....",err);
})