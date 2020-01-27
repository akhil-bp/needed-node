function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework('math', function() {
  alert('Finished my homework');
});
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished(){
  alert('Finished my homework');
}
doHomework('math', alertFinished);
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function doHomework(subject, cb) {
    alert(`first`);
    cb()
}
function msg() {
    alert("second")
}
doHomework("malayalam", msg)





//with asunc await++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++==
async function dd(ss){
    var dd = await fetch(ss)
    .then(function (response){
        return response.json()
    })
    .then(function (json){
        console.log(json)
    })
.catch((e)=>{
        console.log("catch",e)
    })
    console.log("last")
}
dd("https://one2one.enfinlabs.com:8080/room/get_all_users")




//without asunc await+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function dd(ss){
    console.log("first")
    var dd = fetch(ss)
    .then(function (response){
        return response.json()
    })
    .then(function (json){
        console.log(json,"second")
    })
.catch((e)=>{
        console.log("catch",e)
    })
    console.log("last")
}
dd("https://one2one.enfinlabs.com:8080/room/get_all_users")
