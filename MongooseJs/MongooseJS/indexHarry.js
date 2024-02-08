const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/New_Collection')
        .then(() => console.log("Connection succesfully...."));

}
const kittySchema = new mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function speak() {
    const greeting = "My Name is " + this.name
    console.log(greeting);
  };
const Kitten = mongoose.model('harrykitty', kittySchema);

const harrykitty = new Kitten({ name: 'harrykitty' });
const harrykitty2 = new Kitten({ name: 'harrykitty2' });

console.log(harrykitty.name);
harrykitty.speak();

harrykitty.save();
// harrykitty.speak(); 

harrykitty2.save();
// harrykitty2.speak(); 

const kittens = Kitten.find({name: 'harrykitty'});
console.log(kittens);