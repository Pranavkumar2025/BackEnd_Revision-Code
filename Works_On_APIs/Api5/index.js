let check = document.querySelector("#check");

check.addEventListener("click", () => {
  checkfunc();
});
// -------------------->> this is the Method of POST data from our Website to the server <<-----------------------------------
                   
            //    here we can sed our {myInit} data to the web server {https://reqres.in/api/users} 

const url = 'https://reqres.in/api/users';
const checkfunc = async ()=>{
    console.log("Button i think clicked");
    try{
    let myname = document.getElementById('name').value;
    let myjob = document.getElementById('job').value;


    const InitData = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:myname,job:myjob})
    };
    const mydata =await fetch(url,InitData);
    if(!mydata.ok){
        throw Error(mydata.statusText);
    }
    console.log("Your data is Send Succesfully");
    const jsonData = await mydata.json();

    console.log(jsonData);
  }catch(err){console.log("some errror is Found in your data")};

}


// const url = 'data.json';
// const checkfunc = async ()=>{
//     console.log("Button i think clicked");
//     try{
//     let myname = document.getElementById('name').value;
//     let nick= document.getElementById('job').value;


//     const InitData = {
//         method: "POST",
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({name:myname,nickName:nick})
//     };
//     const mydata =await fetch(url,InitData);
//     if(!mydata.ok){
//         throw Error(mydata.statusText);
//     }
//     console.log("Your data is Send Succesfully");
//     const jsonData = await mydata.json();

//     console.log(jsonData);
//   }catch(err){console.log("some errror is Found in your data")};

// }




// const checkfunc =async ()=>{
//     console.log("My Button Clicked...");
//     try{
//     var myInit = {
//         method: "POST",
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body:'{"name":"Tutu Kumar","job":"Web Developer"}'
//     };
//     const val =await fetch('https://reqres.in/api/users',myInit);
//     if(!val.ok){
//         throw Error(val.statusText);
//     }
//     console.log("Your data is send Succesfully..");
//     const mydata = await val.json();

//     console.log(mydata);
// }
//    catch(err){console.log("Some errror is found");}
// }