// // // //   ------------- --------Ye sara step mongoose docs website se lena hai pr sara line to line copy nahi karna hai----------- -----------------

//              ------------- Copy shirf model tak he karna hai phir data insert kar ke ,data.save() kar dena hai ----------- 

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/selfmongo') // selfmongo khood ka data base hai jo create kiya gaya hai data ko store krne ke liye
        .then(() => console.log("Connection Succsfully.... "));
}


// -------- Yaha pr type show karenge insert krne wala data ka ki kis type ka data hai for ex. name ka type hai String -----
//               ------   very Important Part  ------
const kittySchema = new mongoose.Schema({
    name: String,
    Class: String,
    Project: String,
    GroupMember:Number,
    Rational: String
});

// ------Model Part------

const Kitten = mongoose.model('Kitten', kittySchema);

//------Below the Model part we can insert the Data------

const harrykitty = new Kitten({ name: 'harrykitty', Class: 'CSE AIML', Project: 'Data Base ', GroupMember: 5,Rational: "Non Rational"});
const harrykitty2 = new Kitten({ name: 'tutukitty', Class: 'CSE AIML', Project: 'Data Base ', GroupMember: 5,Rational: "Rational"});
const tutu  = new Kitten({ name: 'pranavkitty', Class: 'CSE AIML', Project: 'Data Base ', GroupMember: 5,Rational: "Non Rational"});

//----- this is save Part of above data-------
harrykitty.save();
harrykitty2.save();
tutu.save();