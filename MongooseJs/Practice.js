
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/instantDelete")
.then(()=>{console.log("Connection succesfull..")})
.catch((err)=>{console.log("Some error Occured in your program..",err)})

// We can Create Mutliple Schema too.....

// our first Schema
const myfileSchema  = new mongoose.Schema({
    name : String,
    Age : Number,
    Branch : String,
    CRoll : Number
})
// our Second Schema
const myfileSchema2 = new mongoose.Schema({
    name: String,
    Code: Number,
    Pin : Number
})


const myfile = new mongoose.model("fileList1",myfileSchema);//First Schema Models
const myfile2 = new mongoose.model("fileList2",myfileSchema2);//Second Schema Models

const createDocument = async()=>{
    try{
        // Our First Schema Data
        const mydoc1 = new myfile({
            name: "Tutu Kumar",
            Age : 21,
            Branch: "CSE",
            CRoll : 61
        })
        const mydoc2 = new myfile({
            name: "Tutu Kumar",
            Age : 21,
            Branch: "AIML",
            CRoll : 25
        })
        const mydoc3 = new myfile({
            name: "Tipendra Kumar",
            Age : 21,
            Branch: "CSE",
            CRoll : 61
        })
        const mydoc4 = new myfile({
            name: "Tutu Kumar Kushwaha",
            Age : 23,
            Branch: "AIML",
            CRoll : 61
        })
        const mydoc5 = new myfile({
            name: "Pranav kumar Kushwaha",
            Age : 21,
            Branch: "CSE",
            CRoll : 12
        })

        // Our Second Schema Data 
        const mydocA = new myfile2({
            name:"Pranav Kumar",
            Code: 3233,
            Pin:3299
        })
        const mydocB = new myfile2({
            name:"Pranav Kumar Kushwaha",
            Code: 3253,
            Pin:329987
        })
        //if we have only one data in our DataList
            // const result = await mydoc1.save();

        // const result  = await myfile.insertMany([mydoc1,mydoc2,mydoc3,mydoc4,mydoc5])
        // const result2  = await myfile2.insertMany([mydocA,mydocB]);

        // console.log(result);
        // console.log(result2);
    }
    catch(err){console.log(err)}

}

createDocument();