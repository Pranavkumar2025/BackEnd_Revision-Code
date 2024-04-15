const express = require('express');

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello this is Home Page");
})

app.get("/contact",(req,res)=>{
    res.send("<h1> Hello this is Contact Page </h1>");
})

app.get("*",(req,res)=>{
    res.send("404 page Not found");
})

app.listen(3000,()=>{
    console.log("Your Server is Created at Port 3000");
})