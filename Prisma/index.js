import express from "express";
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const prisma = new PrismaClient();


app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/post', async (req,res)=>{
    const {Name, age} = req.body;

    try {
        const product = await prisma.product.create({
            data : {Name,age}
        })
        res.send(product);
        res.send("Succesfully sent...");
    } catch (error) {
        console.log("Something Error in this page...");
        
    }
    
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
