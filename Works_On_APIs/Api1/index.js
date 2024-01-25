

const btn = document.querySelector("#btn");
const text = document.querySelector("#text");

btn.addEventListener('click',()=>{
    makerequest();
});
const url = "myfileq.txt";
// ---------------------------->> using async await method <<---------------------------------

// -> this method is simple and use to handle so that we genrally use this method for API calling
const makerequest = async ()=>{
    try{console.log("Button Clicked..");
    const urldata = await fetch(url);
    if(!urldata.ok){
        throw new Error(`Network response was not ok: ${urldata.status}`);
    }
    const readData = await urldata.text();
    console.log(readData);
    text.innerHTML = readData;
    }catch(err){console.log('Error in making the request:', err);}

}

// ---------------------------->> using fetch catch method <<---------------------------------


// -> this method is complex but sometime this is also used

// const makerequest = () => {
//     console.log("Button Clicked..");
//     try {
//         fetch('myfile.txt')
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`Network response was not ok: ${res.status}`);
//                 }
//                 return res.text();
//             })
//             .then((data) => {
//                 console.log(data);
//                 text.innerHTML = data;
//             })
//             .catch((err) => console.log(err));
//     } catch (error) {
//         console.error('Error in making the request:', error);
//     }
// };

