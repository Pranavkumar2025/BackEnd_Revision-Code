const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/PranavFormPage").then(()=>{
    console.log("Connection Succesfull...");
}).catch((err)=>{
    console.log("Some Error in you Page....",err);
})


const PageSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    }
})


const PageModel = new mongoose.model("PageModel",PageSchema);

export default PageModel;