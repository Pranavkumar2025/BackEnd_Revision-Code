const express = require('express');
const fs = require('fs');

const server = require('./MOCK_DATA.json')


const app = express();


app.use(express.urlencoded({extended : false}))

app.use((req,res,next)=>{
    console.log("Hello from MiddelWare 1");
    next();
})

app.use((req,res,next)=>{
    console.log("Hello From Middleware 2")
    next();
})

app.use((req,res,next)=>{
    fs.appendFile('log.txt',`\n${Date.now()} : ${req.ip} :${req.method} : ${req.path} \n`,(err,data)=>{
        next();
    })
})



app.get('/',(req,res)=>{
    res.send("<h1> Hello EveryOne </h1>")
})

app.get('/api/users',(req,res)=>{
    res.json(server);
})
app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${server.map((data)=>
        `<li>${data.first_name}</li>`
    ).join(" ")}
    </ul>
    `
    res.send(html)
})


// app.get('/api/users/:id',(req,res)=>{
//     const urlId = Number(req.params.id);
//     const user = server.find((user)=> user.id === urlId)
//      return res.json(user)
// })
// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status : "Pending"})
// })
// app.delete('/api/usres/:id',(req,res)=>{
//     return res.json({status: "Pending"})
// })


// In above we have same URL Ex-{('/api/users/:id')} thats why we are using this 

app.route('/api/users/:id')
.get((req,res)=>{
    const urlId = Number(req.params.id);
    const user = server.find((user)=> user.id === urlId)
    return res.json(user);
})
.patch((req,res)=>{
    return res.json({status : "Pending"})
})
.delete((req,res)=>{
    return res.json({status: "Pending"})
})

app.post('/api/users',(req,res)=>{
    const body = req.body;
    console.log("Body is : ", body)
    return res.json({status : "Pending"})
})


app.listen(3000,()=>{
    console.log("Server is running at port 3000...");
})