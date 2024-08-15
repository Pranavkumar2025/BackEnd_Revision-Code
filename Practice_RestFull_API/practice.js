const express = require('express');
const MyData = require('./MOCK_DATA.json');
const app = express();

// app.use(express.urlencoded({extended : false}))

app.use(express.json());

app.get('/',(req,res)=>{
    const html = `
    <h1>${MyData.map((val)=>`<li>${val.first_name}</li>`).join("")}</h1>`
    res.send(html);
})
app.get('/api/users',(req,res)=>{
    res.json(MyData);
})
app.post('/api/users',(req,res)=>{
    res.send("Data send Succesfull...")

    const body = req.body;
    console.log(body)
    const newUser = { id : MyData.length,...body}
    MyData.push(newUser)
})

app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id);
    const data = MyData.find((val)=>val.id === id);
    res.json(data);
}).patch((req,res)=>{
    res.json({status : "Pending"});
}).delete((req,res)=>{
    res.json({status : "Pending"});
})

// app.patch('/api/users/:id',(req,res)=>{
//     res.json({status : "Pending"});

// })
// app.delete('/api/users/:id',(req,res)=>{
//     res.json({status : "Pending"});
// })


app.listen(3000,()=>{
    console.log("Server is listening at Port 3000...");
})