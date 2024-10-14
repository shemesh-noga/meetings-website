//built fake class Simulates real ajax
class Fajax{

  open(method, url, body = 'null'){
        this.method=method,
        this.url=url,
        this.body=body 
    }
  
    //send the data to net work
  send(){     
    let responsedFromNet = getData(JSON.stringify(this));
    console.log(this)
  }

}

// const fajax= new Fajax();
// // fajax.onload = function() {
   
// //   }
// fajax.open("GET", "hi/hello");
// fajax.send();



//creat new divs with class num by the meeting id
function buildDivs(){
const info=getCurrentUserInfo(("meetings"));
let element = document.getElementById("meeting-container");
const fajax= new Fajax();
fajax.onload= function(){

}
// const currentuser = "tairAndNoga/api/currentuser/meetings"
fajax.open("GET", "tairAndNoga/api/currentuser/meetings");
fajax.send();
for(let i=0; i<info.length; i++){

    let el = `<div id="div${info[i]["id"]}" class="meeting">
    <p class="meetingName">${info[i]["name"]}</p>
    <p></p>
    <button class="delete" id="btnDelete${info[i]["id"]}" > delete </button>
    <button class="edit" id="btnEdit${info[i]["id"]}"> edit </button>
    </div>`;
    element.appendChild(el);
}
}














