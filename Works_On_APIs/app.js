const URL = "https://cat-fact.herokuapp.com/facts";

let fact = document.querySelector("#fact");

let btnfact = document.querySelector("#getFact");

const getFact = async ()=>{
    // console.log("Getting Data.....");
    fact.innerHTML = "Getting Data.......";

    let resoponse = await fetch(URL);
    // console.log(resoponse)
    let mydata = await resoponse.json();
    fact.innerHTML ="";

    for(var i=0;i<mydata.length;i++){
        fact.innerHTML += mydata[i].text + "<br>";
    }


}
btnfact.addEventListener('click',getFact);



// const URL = "https://cat-fact.herokuapp.com/facts";

// let fact = document.querySelector("#fact");
// let btnfact = document.querySelector("#getFact");

// const getFact = async () => {
//     fact.innerHTML = "Getting Data.......";

//     let response = await fetch(URL);
//     let data = await response.json();

//     // Clear previous facts
//     fact.innerHTML = "";

//     for (var i = 0; i < data.length; i++) {
//         // Concatenate facts
//         fact.innerHTML += data[i].text + "<br>";
//     }
// };

// btnfact.addEventListener('click', getFact);
