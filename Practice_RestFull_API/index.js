const express = require('express');

const server = require('./MOCK_DATA.json')


const app = express();

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


app.get('/api/users/:id',(req,res)=>{
    const urlId = Number(req.params.id);
    const user = server.find((user)=> user.id === urlId)
     return res.json(user)
})


app.listen(3000,()=>{
    console.log("Server is running at port 3000...");
})