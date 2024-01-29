const Connection = require('./Connection');
const express = require('express');

const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/register.html');
})
app.post('/',(req,res)=>{
    var Name = req.body.Name;
    var Email = req.body.Email;
    var MobileNo = req.body.MobileNo;


    Connection.connect((error)=>{
        if(error) throw error;
        console.log("Connection Succesfull..");

        var sql = "INSERT INTO student(Name,Email,MobileNo) VALUES(?,?,?)";
        Connection.query(sql,[Name,Email,MobileNo],(error,result)=>{
            if(error) throw error;
            res.send("Student Register Succesfully"+result.insertId);
        })
    
    })
})
app.listen(3000,()=>{
    console.log("Server is running at 3000...");
})



