//while you press the log in page, it will transform you to log in page
var loginBtn = document.getElementById("log-in-btn");
var section = document.getElementById("see-template")

loginBtn.addEventListener("click", changeTemplate);
//save the data of the page we want to put in the screen
function changeTemplate() {
    section.innerHTML = "";
    let loginTemp = document.getElementById("log-in-template");
    let loginContent = loginTemp.content.cloneNode(true);

    //trensform the template into the section and change page 
    section.appendChild(loginContent)
}

function changeTemplateToMeeting() {
    section.innerHTML = "";
    let meetingTemp = document.getElementById("meeting-template");
    let meetingContent = meetingTemp.content.cloneNode(true);
  
    //trensform the template into the section and change page 
    section.appendChild(meetingContent)
}




