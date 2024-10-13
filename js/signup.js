const loginBtn = document.getElementById("log-in-btn");
const section = document.getElementById("see-template")

loginBtn.addEventListener("click", changeTemplate);

//save the data of the page we want to put in the screen
function changeTemplate() {
    section.innerHTML = "";
    let loginTemp = document.getElementById("log-in-template");
    let loginContent = loginTemp.content.cloneNode(true);

    //trensform the template into the section and change page 
    section.appendChild(loginContent)
}
