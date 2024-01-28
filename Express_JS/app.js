const express = require('express');
const app = express();
const PORT = 8000;

const hbs = require('hbs');
app.set('view engine', 'hbs');

app.set('views','./myviews/views');//---> this method is used when we change the name of the 'views' folder and their path.
hbs.registerPartials('./myviews/shortviews')


// app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/new',(req,res)=>{
    res.render('newNav')
})

app.listen(PORT,()=>{console.log(`Server is Running at PORT: ${PORT}`)});