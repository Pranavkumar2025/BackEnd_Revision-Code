
const url = "https://cat-fact.herokuapp.com/facts";


const fact = document.querySelector("#fact");

const show = document.querySelector("#show");
show.addEventListener('click',()=>{
     getFact();
});
const getFact = async ()=>{
    
    let resoponse = await fetch(url);
    console.log(resoponse)

    let readformat =await resoponse.json();
    fact.innerHTML=readformat[1].text;
}



// ------ Getting all the Text

// const URL = "https://cat-fact.herokuapp.com/facts";

// let fact = document.querySelector("#fact");

// let btnfact = document.querySelector("#getFact");

// const getFact = async ()=>{
//     // console.log("Getting Data.....");
//     fact.innerHTML = "Getting Data.......";

//     let resoponse = await fetch(URL);
//     // console.log(resoponse)
//     let mydata = await resoponse.json();
//     fact.innerHTML ="";

//     for(var i=0;i<mydata.length;i++){
//         fact.innerHTML += mydata[i].text + "<br>";
//     }


// }
// btnfact.addEventListener('click',getFact);


