const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/RestFull")
.then(()=>{console.log("Conncetion Succesful...")})
.catch((err)=>{console.log("No Connections...!!!!")})

