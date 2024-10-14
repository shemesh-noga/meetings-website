class Response{
    constructor(status, message, data = ""){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}



// בודק האם קיים משתמש בשם הזה, אם לא מוסיף את המשתמש החדש
function addingNewUser(objString){
    obj = JSON.parse(objString);
    const thisUser = getInfo("users", obj["username"]);
    let response;

    if (thisUser === false) {
        // do function
        response = new Response(200, "user was added succesfully", JSON.stringify(newuser));
    } else {
        response = new Response(404, "there is already a user with this name");
    }
    return response;
}


// הוספת פגישה חדשה
function addingNewMeeting(objString){
    obj = JSON.parse(objString);
    let response;
    if(obj["name"] === undefined || obj["time"] === undefined) {
        response = new Response(404, "please fill name and or time");
    } else {
        // do function
        response = new Response(200, "meeting added succesfully", JSON.stringify(newMeeting))
    }
    return response;
}


// עושה כניסה לוגין
function checkingLogIn(objString) {
    obj = JSON.parse(objString);


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



function deleteMeeting(obj) {
// אם קיים איידי כזזה, ואם הוא שלו אם כן
}






