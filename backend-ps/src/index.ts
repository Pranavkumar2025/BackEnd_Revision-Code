import express,{Request,Response} from "express"
const app = express()
const port = 3000

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { details } from "@prisma/client";

import { generateToken } from "./utils/jwt"
import { authenticateJWT } from "./middlewares/auth"

app.use(express.json())

interface User{
    email : string,
    name  : string,
    password : string
}

import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}


app.get('/users',async(req:Request,res:Response)=>{
    const allUsers = await prisma.details.findMany();
    res.send(allUsers)
})


app.post('/signup',async (req:Request,res:Response)=>{
    const {email,name,password} = req.body;
    const ifExist : User | null= await prisma.details.findUnique({
        where : {
            email 
        }
    })
    if(ifExist == null){
        try{
            const createdUser : User = await prisma.details.create({
                data : {
                   email,
                   name,
                   password
                }
              })
         res.status(201).json({ message : "user created",createdUser})
        }
        catch(error){
            console.log(error);
        }
    }
    else{
        res.json({
            "message" : "User already exist try with another email"
        })
    }
})



app.post('/login',async(req:Request,res:Response)=>{
    const {email,password} = req.body
    try{
        const user : User | null = await prisma.details.findUnique({
            where : { email }
        })
        
        if(!user){
            res.send("User not found Please sign up !")
        }
        else{
            if (password == user.password){
                const name = user.name
            const token = generateToken({name})
            res.status(201).json({token,"msg":`Welcome ${user.name}`})
            }
            else{
                res.json({
                    "msg" : "Wrong Password"
                })
            }
        }
    }
    catch(error){
        res.send(error)
    }
})


app.get('/protected', authenticateJWT, (req: Request, res: Response) => {
    const user = req.user as JwtPayload
    res.status(200).json({ message: 'Protected data', "user" :`welcome ${user.name}`});
  });


app.listen(3000,()=>{
    console.log("Server is running at port 3000");
    
})