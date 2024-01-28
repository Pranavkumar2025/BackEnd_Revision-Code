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



// const Connection = require('./Connection');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/register.html');
// });

// app.post('/', (req, res) => {
//     var Name = req.body.Name;
//     var Email = req.body.Email;
//     var MobileNo = req.body.MobileNo;

//     Connection.connect((error) => {
//         if (error) {
//             console.error('Error connecting to the database:', error);
//             return res.status(500).send('Error connecting to the database');
//         }

//         console.log("Connected to the database.");

//         var sql = "INSERT INTO student(Name, Email, MobileNo) VALUES (?, ?, ?)";
//         Connection.query(sql, [Name, Email, MobileNo], (error, result) => {
//             if (error) {
//                 console.error('Error executing SQL query:', error);
//                 return res.status(500).send('Error executing SQL query');
//             }
//             console.log("Student registered successfully");
//             res.send("Student registered successfully. ID: " + result.insertId);
//         });
//     });
// });

// app.listen(3000, () => {
//     console.log("Server is running at 3000...");
// });

// Connection.connect((error) => {
//     if (error) {
//         console.error('Error connecting to the database:', error);
//         return;
//     }
//     console.log("Connected to the database.");

//     Connection.query("SELECT * FROM student", (error, result) => {
//         if (error) {
//             console.error('Error executing SQL query:', error);
//             return;
//         }
//         console.log("Students retrieved from the database:", result);
//     });
// });
