const signupBtn = document.getElementById("log-in-btn");
const section = document.getElementById("see-template")

signupBtn.addEventListener("click", changeTemplate);

function changeTemplate() {
    section.innerHTML = "";
    let loginTemp = document.getElementById("log-in-template");
    let loginContent = loginTemp.content.cloneNode(true);

    section.appendChild(loginContent)
}
