


const text = document.querySelector("#text");
const btn = document.querySelector("#check");

const url = 'data.json';

btn.addEventListener('click',()=>{
    myFunc();
})
const myFunc =async ()=>{
    try{
        const data = await fetch(url);
        const textdata = await data.json();

        console.log(data)
        text.innerHTML= `<h1> Name is ${textdata.name} : Nick name is : ${textdata.nickName}`

        return data;
    }
    catch(err){
        console.log("You have Error in your Code");
    }
}




