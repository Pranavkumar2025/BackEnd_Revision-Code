
var hbs = require('hbs');
const express = require('express');


const app = express();

app.set('view engine', 'hbs');
// app.set('views','viewstu'); //->when we change the name of the 'views' folder to 'viewstu'
hbs.registerPartials('partial');
// app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.listen(3000,()=>{
    console.log("Your Server is Created....");
});





// var hbs = require('hbs');
// const express = require('express');
// const path = require('path');

// const app = express();

// // Set the views directory
// app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//     res.render('index', { headersec: 'header' });
// });

// app.get('/about', (req, res) => {
//     res.render('about', { headersec: 'header' });
// });

// app.get('/contact', (req, res) => {
//     res.render('contact', { headersec: 'header' });
// });

// app.listen(8000, () => {
//     console.log("Your Server is Created....");
// });
