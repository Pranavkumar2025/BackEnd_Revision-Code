const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/NewDataBaseForMe")
.then(()=>{console.log("Connection Succesfull..");})
.catch((err)=>{console.log("Error is found....OOps")})


const mylistSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age : Number,
    Branch : String,
    validity: Boolean,
})

const mylist = new mongoose.model("FileList",mylistSchema);

module.exports = mylist;