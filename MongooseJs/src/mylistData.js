const mylist = require('./index');


const createDocument = async()=>{
    try{
        const list1 = new mylist({
            name: "Tutu Kumar",
            age:23,
            Branch:"AIML",
            validity:true
        })
        const list2 = new mylist({
            name: "Kumari Sonal",
            age:21,
            Branch:"CSM",
            validity:true
        })
        const list3 = new mylist({
            name: "Sonal Singh",
            age:20,
            Branch:"SM",
            validity:true
        })
        const list4 = new mylist({
            name: "Tutu Singh Kushwaha",
            age:23,
            Branch:"CS",
            validity:true
        })
        const list5 = new mylist({
            name: "Pranav Kumar Kushwaha",
            age:21,
            Branch:"AIML",
            validity:true
        })

        const result = await mylist.insertMany([list1,list2,list3,list4,list5]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// createDocument();

const showDocument =async ()=>{
    try{
    const result = await mylist.find({$and:[{Branch:'AIML'},{age:23}]});
    console.log(result);
    }catch(err){
        console.log(err);
    }
}

showDocument();