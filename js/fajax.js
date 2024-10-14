
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
