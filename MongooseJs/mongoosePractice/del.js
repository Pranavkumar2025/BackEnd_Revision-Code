const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/PranavMongo").then(()=>{
    console.log("Connection Succesful...");
}).catch((err)=>{
    console.log("You have Some problem in your code You have to find your Code...",err);

})


const mySchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Branch : String,
    Number : Number

})


const pranvFile = new mongoose.model("FileMode",mySchema);

const createNewFile  = async ()=>{

    const mydoc1 = await new pranvFile( {
        Name : "Pranav Kumar",
        Branch : "AIML",
        Number : 2323
    })

    const data = await mydoc1.save();

    console.log(data)
}

createNewFile()