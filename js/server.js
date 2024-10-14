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
    const body = obj["body"]

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
                    const thisdata = getInfo(key, index)
                    response = new Response(200, `got ${index}`, thisdata)
                    return response;
                }

            } else {
                if (regMatch !== "currentuser" || regMatch !== "meetings" || regMatch !== "users") {
                    response = new Response(404, `${regMatch} not found in local storage`);
                    return response;
                } else {
                    const thisdata = getInfo(regMatch);
                    response = new Response(200, `got ${regMatch}`, thisdata);
                    return response;
                }
            }
            
            break;

        case "POST":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/);
                let index = regMatch.match(/\/(.+)/);
                if(key === "meetings" && index === "new") {addingNewMeeting(body)}
                else {
                    response = new Response(404, `key:${key} and or index:${index} not found`)
                    return response;
                }
            } else {
                if(regMatch === "signin") {addingNewUser(body)}
                else if(regMatch === "login") {checkingLogIn(body)}
                else {
                    response = new Response(404, `path:${regMatch} not found`)
                    return response;
                }
            }

            break;

        case "PUT":
            if () {

            }
            break;

        case "DELETE":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/);
                let index = regMatch.match(/\/(.+)/);

                if(key === "meetings") {
                    let data = deleteMeeting(body.id);
                    response = new Response(202, "meeting deleted succesfully", data);
                    return response;
                }
            }

            break;
    }


}




// בודק האם קיים משתמש בשם הזה, אם לא מוסיף את המשתמש החדש
function addingNewUser(obj){
    const thisUser = getInfo("users", obj["username"]);
    let response;

    if (thisUser === false) {
        addNewUser(obj["username"], obj["password"]);
        response = new Response(200, "user was added succesfully");
    } else {
        response = new Response(404, "there is already a user with this name");
    }
    return response;
}



// הוספת פגישה חדשה
function addingNewMeeting(obj){
    let response;
    if(obj["name"] === undefined || obj["time"] === undefined || obj["name"] === "" || obj["time"] === "" ) {
        response = new Response(404, "please fill name and or time");
    } else {
        addNewMeeting(obj["name"], obj["time"]);
        response = new Response(200, "meeting added succesfully")
    }
    return response;
}



// בודק או עושה כניסה לוגין
function checkingLogIn(obj) {
    let response;
    const tryLogIn = getInfo("users", obj["username"])
    if(tryLogIn === false) {
        response = new Response(404, `user doesn\'t exist`);
    } else if (tryLogIn["password"] !== obj["password"]){
        response = new Response(404, "wrong password");
    } else {
        doLogIn(obj)
        response = new Response(200, `logged in succesfully into ${obj["username"]}`)
    }
    return response;
}


function updatingMeeting(obj){
    
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






