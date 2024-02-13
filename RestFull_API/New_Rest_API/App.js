const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>HELLO EveryOne</h1>");
})

app.listen(3000,()=>{
    console.log("Your server is running at port 3000....");
})