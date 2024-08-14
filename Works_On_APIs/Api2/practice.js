


const text = document.querySelector("#text");
const btn = document.querySelector("#check");

const url = 'data.json';

btn.addEventListener('click',()=>{
    myFunc();
})

const myFunc = async ()=>{
    try {
        const myurl = await fetch(url);
        if(!myurl.ok){
            throw Error(myurl.statusText);
        }
        const urldata = await myurl.json();
        console.log(urldata.name);
    } catch (error) {
        console.log(error);
    }
}



