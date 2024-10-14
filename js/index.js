
function changeTemplateToMeeting() {
    section.innerHTML = "";
    let meetingTemp = document.getElementById("meeting-template");
    let meetingContent = meetingTemp.content.cloneNode(true);
  
    //trensform the template into the section and change page 
    section.appendChild(meetingContent)
}
  
  
  // const fajax = new Fajax();
  // fajax.open("DELETE", "tairAndNoga/api/meetings", '{"id":2}');
  // fajax.onload = (request) => {console.log(request); alert(JSON.stringify(request))}
  // fajax.send();
  



  let signupBtnUser = document.getElementById("sign-up-user")
  // const loginBtnUser = document.getElementById("log-in-user");
  signupBtnUser.addEventListener("click", chekingSignUpBtn)
    
  function chekingSignUpBtn() {
      const usernameVal = document.getElementById("username").value;
      const passwordVal = document.getElementById("password").value;
      const passwordCheckVal = document.getElementById("password-check").value;
  
    
      const fajax = new Fajax();
      fajax.open("POST", "tairAndNoga/api/signup", `{"username":"${usernameVal}", "password": ${passwordVal}}`);
      fajax.onload= function(response){
        if (response["status"] === 404) {
          alert(response["message"])
        } else {
          if(passwordCheckVal !== passwordVal || passwordVal.toString().length < 4){
              alert("create a password with at least 4 charachters and validate it")
          } else {
              const fajaxlogin = new Fajax();
              fajaxlogin.open("POST", "tairAndNoga/api/login", `{"username":"${usernameVal}", "password": ${passwordVal}}`);
              fajaxlogin.onload= function(response){
                  if (response["status"] === 404) {
                      alert(response["message"])
                  } else {
                      changeTemplateToMeeting()
                  }
              fajaxlogin.send();
              }
          }
        }
        
      }
      fajax.send();
  }


  let loginBtnUser = document.getElementById("log-in-user")
  // const loginBtnUser = document.getElementById("log-in-user");
  loginBtnUser.addEventListener("click", chekingLoginBtn)
    
  function chekingLoginBtn() {
      const usernameVal = document.getElementById("username").value;
      const passwordVal = document.getElementById("password").value;
    
      const fajax = new Fajax();
      fajax.open("POST", "tairAndNoga/api/login", `{"username":"${usernameVal}", "password": ${passwordVal}}`);
      fajax.onload= function(response){
        if (response["status"] === 404) {
          alert(response["message"])
        } else {
          changeTemplateToMeeting()
        }
      }
      fajax.send();
  }


  
  
  
  
  //creat new divs with class num by the meeting id
  // function buildDivs(){
  // const info=getCurrentUserInfo(("meetings"));
  // let element = document.getElementById("meeting-container");
  // const fajax= new Fajax();
  
  
  // }
  // // const currentuser = "tairAndNoga/api/currentuser/meetings"
  // fajax.open("GET", "tairAndNoga/api/currentuser/meetings");
  // fajax.send();
  // for(let i=0; i<info.length; i++){
  
  //     let el = `<div id="div${info[i]["id"]}" class="meeting">
  //     <p class="meetingName">${info[i]["name"]}</p>
  //     <p></p>
  //     <button class="delete" id="btnDelete${info[i]["id"]}" > delete </button>
  //     <button class="edit" id="btnEdit${info[i]["id"]}"> edit </button>
  //     </div>`;
  //     element.appendChild(el);
  // }