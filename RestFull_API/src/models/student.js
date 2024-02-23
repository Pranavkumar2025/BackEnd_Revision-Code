const mongoose = require('mongoose');
const validator = require('validator');

const studentScehema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 3
    },
    email:{
        type: String,
        required:true,
        unique: [true,"Email id is Already Present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email..")
            }
        }
    },
    phone:{
        type : Number,
        minlength: 10,
        maxlength:15,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required:true
    }
})

// Now i will create a new model
const student = new mongoose.model("Student",studentScehema);

module.exports = student;

// const mongoose = require('mongoose');
// const validator = require('validator');

// const studentSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 3
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: [true, "Email id is Already Present"],
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Invalid Email..");
//             }
//         }
//     },
//     phone: {
//         type: String, // Change type to String
//         required: true,
//         unique: true,
//         minlength: 10, // Adjust to your phone number length requirements
//         maxlength: 15 // Adjust to your phone number length requirements
//     },
//     address: {
//         type: String,
//         required: true
//     }
// });
l

// const Student = mongoose.model("Student", studentSchema); // Adjusted model name to start with uppercase

// module.exports = Student;
