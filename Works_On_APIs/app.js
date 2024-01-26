// --------------------->> Showing weather report on Every city which you Enter <<-------------------------

                //   --->Weather Report <---

let show = document.querySelector("#show");
let fact = document.querySelector("#fact");

show.addEventListener("click", () => {
  showFact();
});

const showFact = async () => {
  try {
    console.log("You clicked the button");
    let place = document.querySelector("#place").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=82e0e6a5e2b7df2e56550b3c128289e6`;
    const myurl = await fetch(url);
    if (!myurl.ok) {
      throw Error(myurl.statusText);
    }
    console.log(myurl);
    const urlJson = await myurl.json();
    console.log(urlJson);
    let Myweather = urlJson.weather[0].main;
    let MyweatherIcon = urlJson.weather[0].icon;

    const temp = (urlJson.main.feels_like - 273.15).toFixed(2);

    fact.innerHTML = `<h2> Temperature of ${place} is: ${temp}  🌡️degree Celcius</h2> 
                        <h3>Weather is : ${Myweather} </h3> ${MyweatherIcon}`;
  } catch (err) {
    console.log("You have errror in your code");
  }
};


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
