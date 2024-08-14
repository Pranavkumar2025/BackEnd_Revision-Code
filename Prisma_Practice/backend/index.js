const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const express = require('express');



const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("I think it works Properly ...");
})

app.post("/signUp", async (req,res)=>{
    try {
        const{Name,Email,password} = req.body;
        const admin = await prisma.myuser.create({
            data: {
                Name : Name,
                Email : Email,
                password : password
            }
        })
        // res.json(admin);
        res.send("SignUP Succesfull");

    } catch (error) {
        res.status(501).json({message: "Not Signup it's Invalid"});
        console.log(error);
    }

})

app.post("/login", async (req,res)=>{
    const{Email,password}= req.body;

    try {
        const admin = await prisma.myuser.findUnique({
            where : {
                Email : Email
            }
        })
        if (admin && admin.password === password){
            // res.send("Login SuccesFull");
            res.json({id: admin.id});
        }
        else{
            res.send("You are Not SignUp first go and SignUp")
        }
    } catch (error) {
        res.status(501).json({message: "Something Problem in this code"});
        console.log(error);
        
    }
})



app.listen(PORT,()=>{
    console.log(`Server is listening at PORT ${PORT}...`);
})