
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/instantDelete")
.then(()=>{console.log("Connection succesfull..")})
.catch((err)=>{console.log("Some error Occured in your program..",err)})


const myfileSchema  = new mongoose.Schema({
    name : String,
    Age : Number,
    Branch : String,
    CRoll : Number
})
const myfileSchema2 = new mongoose.Schema({
    name: String,
    Code: Number,
    Pin : Number
})


const myfile = new mongoose.model("fileList1",myfileSchema);
const myfile2 = new mongoose.model("fileList2",myfileSchema2);

const createDocument = async()=>{
    try{
        const mydoc1 = new myfile({
            name: "Tutu Kumar",
            Age : 21,
            Branch: "CSE",
            CRoll : 61
        })
        const mydoc2 = new myfile({
            name: "Tutu Kumar",
            Age : 21,
            Branch: "CSE",
            CRoll : 61
        })
        const mydoc3 = new myfile({
            name: "Tutu Kumar",
            Age : 21,
            Branch: "CSE",
            CRoll : 61
        })
        const mydoc4 = new myfile({
            name: "Tutu Kumar",
            Age : 21,
            Branch: "CSE",
            CRoll : 61
        })
        const mydoc5 = new myfile({
            name: "Tutu Kumar",
            Age : 21,
            Branch: "CSE",
            CRoll : 61
        })
        const mydocA = new myfile2({
            name:"Pranav Kumar",
            Code: 3233,
            Pin:3299
        })
        const mydocB = new myfile2({
            name:"Pranav Kumar",
            Code: 3233,
            Pin:3299
        })


        const reuslt  = await myfile.insertMany([mydoc1,mydoc2,mydoc3,mydoc4,mydoc5])
        const reuslt2  = await myfile2.insertMany([mydocA,mydocB]);


        console.log(reuslt);
        console.log(reuslt2);
    }
    catch(err){console.log(err)}

}

createDocument();