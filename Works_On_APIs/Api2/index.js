let check = document.querySelector('#check');
let text = document.querySelector("#text");
check.addEventListener('click',()=>{
    checkfunc();
})
const jsonUrl="data.json";
const checkfunc =async ()=>{
    console.log("Buttom is Clicked..");
    // ------> this is fetch mthod 
    // fetch('data.json').then((res)=>{ return res.json()}).then((data)=>{text.innerHTML=data;console.log(data)})
    try{
    const mydata = await fetch(jsonUrl);
    console.log(mydata);
    if(!mydata.ok){
        throw Error(mydata.statusText);
    }
    const jsonData = await mydata.json();
    console.log(jsonData);

    text.innerHTML = jsonData.name;
    }
    catch(err){console.log(" Error...")};
}