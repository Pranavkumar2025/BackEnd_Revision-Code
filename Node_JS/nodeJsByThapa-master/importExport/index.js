// const { add, sub, name, mult } = require("./oper");

// console.log(add(5, 5));
// console.log(sub(10, 5));
// console.log(mult(10, 5));
// console.log(name);


const osr = require("./oper");

var r = osr.add(5,20);
console.log("Sum is : ",r);
console.log("Differece is: ",osr.sub(23,4));
console.log("Multiplication is: ",osr.mult(32,4));