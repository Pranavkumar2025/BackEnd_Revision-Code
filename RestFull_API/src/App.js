const express = require('express');
const mySql= require("./db/connection");
const student = require("./models/student");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

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

