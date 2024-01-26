let check = document.querySelector("#check");

check.addEventListener("click", () => {
  checkfunc();
});
// -------------------->> this is the Method of POST data from our Website to the server <<-----------------------------------
                   
            //    here we can sed our {myInit} data to the web server {https://reqres.in/api/users} 
const checkfunc =async ()=>{
    console.log("My Button Clicked...");
    try{
    var myInit = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:'{"name":"Tutu Kumar","job":"Web Developer"}'
    };
    const val =await fetch('https://reqres.in/api/users',myInit);
    if(!val.ok){
        throw Error(val.statusText);
    }
    console.log("Your data is send Succesfully..");
    const mydata = await val.json();

    console.log(mydata);
}
   catch(err){console.log("Some errror is found");}
}


// const checkfunc = ()=>{
//     console.log("Button Clicked");

//     var myInit = {
//         method: "POST",
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body:'{"name":"Tutu Kumar","job":"Web Developer"}'
//     };
//     fetch("https://reqres.in/api/users",myInit).then((val)=>{
//         if(!val.ok){
//             throw Error(val.statusText);
//         }
//         console.log("Your data is send Succesfully..");
//         return val.json();
//     })
//     .then((data)=>{
//         console.log(data);
//     })
// }