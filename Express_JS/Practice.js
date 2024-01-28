const express = require('express');

const app = express();

app.listen(3000,()=>{
    console.log("your server is starting at port 3000");
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/practice.html');
})
app.get('/about',(req,res)=>{
    res.send("<h1>Hello My self Pranav Kumar and what is your name and what are you doing in you life.</h1>")
})