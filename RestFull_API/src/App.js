const express = require('express');
const mySql= require("./db/connection");
const student = require("./models/student");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Hello Everyone This is for Testing....");
})
app.get('/student',(req,res)=>{
    res.send(req.body); 
})
app.post('/student',(req,res)=>{
    console.log(req.body);
    const result = new student(req.body);
    result.save().then(()=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
})

app.listen(port,()=>{
    console.log(`Server is Running at PORT ${port}....`);
})



