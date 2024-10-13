const signupBtn = document.getElementById("sign-up-btn");
const section = document.getElementById("see-template")

signupBtn.addEventListener("click", changeTemplate);

function changeTemplate() {
    section.innerHTML = "";
    let signupTemp = document.getElementById("sign-up-template");
    let signupContent = signupTemp.content.cloneNode(true);

    section.appendChild(signupContent)
}