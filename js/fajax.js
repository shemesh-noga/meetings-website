
class Fajax{

  open(method, url, body){
        this.method=method,
        this.url=url,
        this.body=body 
    }
  
  send(){     
    getData(JSON.stringify(this));
    console.log(this)
  }
}






const fajax= new Fajax();
// fajax.onload = function() {
   
//   }
fajax.open("GET", "hi/hello");
fajax.send();



//build the "open" function by enter all the parameters to data and send it to the server
// function send(method, url, data = ""){

//     obj = {
//         "method": method ,
//          "url": url ,
//           "data":  data
//         }
//      JSON.stringify(objMethod);
     
//     server(obj);
// }

 function onload (){

 }

 function response(){

 }





 xhttp.open("GET", "ajax_info.txt");



