class Response{
    constructor(status, message, data = ""){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}


// tairAndNoga/api/meetings/1

function server(objString) {
    const obj = JSON.parse(objString)
    const method = obj["method"]
    const url = obj["url"]
    const data = obj["data"]

    let regMatch = url.match(/\/([^\/]+)$/);
    let regex = /\//;
    let response;

    switch(method) {
        case "GET":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/);
                let index = regMatch.match(/\/(.+)/);

                if(key === "currentUser") {
                    const thisUsername = getCurrentUserInfo("username")
                    response = new Response(200, "got username from currentuser", thisUsername)
                    return response
                } else if(key !== "currentuser" || key !== "meetings" || key !== "users"){
                    response = new Response(404, `invalid ${key}`)
                    return response;
                } else {
                    const thisData = getInfo(key, index)
                    response = new Response(200, `got ${index}`, thisData)
                    return response;
                }

            } else {
                if (regMatch !== "currentuser" || regMatch !== "meetings" || regMatch !== "users") {
                    const thisData = getInfo(regMatch)
                    response = new Response(200, `got ${regMatch}`, thisData)
                    return response
                } else {
                    response = new Response(404, `${regMatch} not found in local storage`, thisData)
                    return response
                }
            }
            
            break;

        case "POST":

            break;
        case "PUT":

            break;
        case "Delete":

            break;
    }


}




// בודק האם קיים משתמש בשם הזה, אם לא מוסיף את המשתמש החדש
function addingNewUser(objString){
    obj = JSON.parse(objString);
    const thisUser = getInfo("users", obj["username"]);
    let response;

    if (thisUser === false) {
        addNewUser(obj["username"], obj["password"]);
        response = new Response(200, "user was added succesfully", {});
    } else {
        response = new Response(404, "there is already a user with this name");
    }
    console.log(response);
    return response;
}



// הוספת פגישה חדשה
function addingNewMeeting(objString){
    obj = JSON.parse(objString);
    let response;
    if(obj["name"] === undefined || obj["time"] === undefined || obj["name"] === "" || obj["time"] === "" ) {
        response = new Response(404, "please fill name and or time");
    } else {
        addNewMeeting(obj["name"], obj["time"]);
        response = new Response(200, "meeting added succesfully")
    }
    console.log(response);
    return response;
}



// עושה כניסה לוגין
function checkingLogIn(objString) {
    obj = JSON.parse(objString);
    let response;
    if() {
        response = new Response(404, "");
    } else {
        addNewMeeting(obj["name"], obj["time"]);
        response = new Response(200, "")
    }
    console.log(response);
    return response;
}


function updatingMeeting(objString){
    obj = JSON.parse(objString);

    
}



// מוחק פגישה
// function deleteMeeting(id){
//     const meetings = getInfo("meetings");
//     const currentuser = getInfo("currentuser");

//    for(let i = 0 ; i < meetings.length ; i ++){
//         if(meetings[i].id === id) {
//             meetings[i] = "";
//             window.localStorage.setItem("meetings",JSON.stringify(meetings));
//             break;
//         }
//    }

//    for(let i = 0 ; i < currentuser["meetings"] ; i++){
//         if(currentuser["meetings"][i] === id) {
//             currentuser["meetings"].splice(i, 1);
//             window.localStorage.setItem("currentuser", JSON.stringify(currentuser))
//             break;
//         }
//    }

//    currentuserToUsers(currentuser);
// }



function deleteingMeeting(obj) {
// אם קיים איידי כזזה, ואם הוא שלו אם כן
}






