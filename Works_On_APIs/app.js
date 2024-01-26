
const show = document.querySelector("#show");
const fact = document.querySelector("#fact");

show.addEventListener('click',()=>{
    getFact();
})
const getFact = async ()=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Kahalgaon&appid=82e0e6a5e2b7df2e56550b3c128289e6";
    console.log("Button Clicked...");

    const myurl = await fetch(url);
    console.log(myurl);

    const jsonUrl = await myurl.json();
    console.log(jsonUrl.main)
    console.log(jsonUrl.main.temp_min);

    fact.innerHTML = `<h1>Min Temp is: ${(jsonUrl.main.feels_like-273.15)}'C</h1>` 
}






// -------------------------->>> Showing New Motivational Quotes on every click on Button <<<--------------------------

// const url = "https://type.fit/api/quotes";


// const fact = document.querySelector("#fact");
// const myblock = document.querySelector('#myblock');

// const show = document.querySelector("#show");
// var i =0;

// show.addEventListener('click',()=>{
//     getFact();
// });
// const getFact =async ()=>{
//     // console.log("Button clicked");
//     const urldata = await fetch(url);
//     const jsonData = await urldata.json();

//     if (i < jsonData.length) {
//         myblock.innerHTML = jsonData[i].text;
//         i++; // Increment index for the next click
//     } else {
//         myblock.innerHTML = "Sorry.. 😲 No more quotes available.";
//     }
// }

