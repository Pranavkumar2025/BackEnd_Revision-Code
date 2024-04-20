const express = require('express');

const app = express();

const server = require('./MOCK_DATA.json');


app.get('/',(req,res)=>{
    return res.json(server);
})

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})