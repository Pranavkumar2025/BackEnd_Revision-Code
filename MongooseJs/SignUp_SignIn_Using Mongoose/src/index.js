const express = require('express');
var hbs = require('hbs');


const app = express();

app.set('view engine', 'hbs');


app.get('/',(req,res)=>{
    res.render('Login');
})
// app.get('/login',(req,res)=>{
//     res.render('Login');
// })
app.get('/SignUp',(req,res)=>{
    res.render('SignUp');
})
app.get('/home',(req,res)=>{
    res.render('home');
})


app.listen(3000,()=>{
    console.log("Your Server is Created....");
});