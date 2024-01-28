
const express = require('express');
const bodyParse = require('body-parser');
const app = express();
app.use(bodyParse.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/GET_POST_Express.html');
});

app.post('/pk/mysub',(req,res)=>{
    console.log(req.body);
    res.send(`<h1>Done Your are Good ${req.body.name} 👍</h1>
    <h2>Your Phone number  is : ${req.body.pno}</h2> Please Confirm it!`)
})


app.listen(3000,()=>{
    console.log("Your Server is Started at Port 3000...");
})