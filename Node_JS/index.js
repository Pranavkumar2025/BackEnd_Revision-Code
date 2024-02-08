const http = require('http');
const fs = require('fs');

// fs.writeFileSync('myfile.txt',"<h1>This is Our Server \n</h1");
fs.writeFile("App.js","hlo",(err)=>{});


const server = http.createServer((req,res)=>{
    fs.appendFileSync('myfile.txt',`\n ${req.url}`);
   console.log(req.url);
//    if(req.url == "/facicon.ico") console.log("");
    if(req.url == '/'){
        res.end("<h1>Your are at the Home Page</h1");
    }
    else if(req.url == '/About'){
        res.end("<h1>You are at the About Page</h1");
        }
    else if(req.url == "/contact"){
        res.end("<h1>You are at the contact Page</h1");
    }
    else{
        res.writeHead(404);
    res.end("<h1>404 Error Page Not Found...</h1>");}
});

server.listen(8000,()=>{
    console.log("Your Server is Created...");
})
