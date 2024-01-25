let check = document.querySelector("#check");
let text = document.querySelector("#text");

check.addEventListener("click", () => {
  checkfunc();
});

let myApi = 'https://jsonplaceholder.typicode.com/posts';
const checkfunc = async ()=>{
    console.log("Button is Clicked..");
    try{
    const myApiData = await fetch(myApi);
    if(!myApiData.ok){
        throw Error(myApiData.statusText);
    }
    console.log(myApiData);
    const myData = await myApiData.json();
    console.log(myData);
    myData.forEach(element => {
        let output = document.querySelector('#allpost');
        output.innerHTML += `
        <div>id:${element.id} </div>
        <div>title:${element.title}</div>
        <div>body:${element.body}</div>  
        `;
    });
}catch(err){console.log("Error is found... in your code");}
}



// const checkfunc = () => {
//     console.log("button is clicked.");
  
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((response) => {
//         console.log(response);
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         let output = document.querySelector("#allpost");
//         data.forEach((element) => {
//           output.innerHTML += `
//             <div>id:${element.id} </div>
//             <div>title:${element.title}</div>
//             <div>body:${element.body}</div>
//           `;
//         });
//       })
//       .catch((err) => {
//         console.log("Data is not found..");
//       });
//   };
  