const express = require('express');

const data = require('./MOCK_DATA.json')

const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>Hello this is a Home Page")
})

app.get('/users',(req,res)=>{
    return res.json(data)

})
app.get('/users/:myid',(req,res)=>{
    const id = Number(req.params.myid);
    const userid = data.find((user)=>user.id === id);

    return res.json(userid)


})

app.get('/users/name',(req,res)=>{

    const html = `<ul>
    ${data.map((val)=>`<li>${val.first_name}</li>`).join(" ")}
    </ul>`

    res.send(html)
})


app.route('/users/:id').get((req,res)=>{
    
})



app.listen(3000,()=>{
    console.log("Server is listening at Port 3000");
})