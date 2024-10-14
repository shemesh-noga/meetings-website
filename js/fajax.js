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
    console.log(this);
    this.onload(responsedFromNet);
  };
}

















