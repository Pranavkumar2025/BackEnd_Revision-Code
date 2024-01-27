const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/pkforDelete")
.then(()=>console.log("Connection Succesfull...."))
.catch((err)=>console.log(err));


const myschema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    RollNo:{
        type : Number,
        required: true
    },
    Age:Number,
    Branch: String
});

const myModel = new mongoose.model("StudentData",myschema);

const myModelDatafunc = async ()=>{
    try{
        const newmyModel = new myModel({
            Name:"Tutu Kumar",
            RollNo: 61,
            Age : 23,
            Branch: "AIML"
        })
        const result = await newmyModel.save();
        console.log(result);
    }
    catch(err){
        console.log(err);
    };
}

myModelDatafunc();