const express = require ("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("<h1>Hello Everyone and What is your name </h1>")
})

app.get("/about",(req,res)=>{
    res.send("<h1>Hello This is about page </h1>")
})

app.listen(3000,()=>{
    console.log("Server is running at PORT 3000....");
})