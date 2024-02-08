const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/practice');
}

const kittySchema = new mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function speak() {
    const greeting = this.name
        ? 'Meow name is ' + this.name
        : 'I don\'t have a name';
    console.log(greeting);
};
const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

fluffy.save();
fluffy.speak()

const kittens = Kitten.find();
console.log(kittens);

Kitten.find({ name: /^fluff/ });