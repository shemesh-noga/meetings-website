
class Fajax{

  open(method, url, body = 'null'){
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
fajax.open("DELETE", "tairAndNoga/api/meetings", '{"id": 1}');
fajax.send();

