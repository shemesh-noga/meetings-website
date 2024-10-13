

const loginBtn = document.getElementById("sign-up-btn");
const section = document.getElementById("see-template")

loginBtn.addEventListener("click", changeTemplate);

//save the data of the page we want to put in the screen
function changeTemplate() {
    section.innerHTML = "";
    let signupTemp = document.getElementById("sign-up-template");
    let signupContent = signupTemp.content.cloneNode(true);

    //trensform the template into the section and change page 
    section.appendChild(signupContent)
}