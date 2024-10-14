//מחלקת משתמש חדש
class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
        this.meetings = [];
    }
}

// מחלקת פגישה חדשה
class Meeting{
    constructor(name, time){
        this.name = name;
        this.time = time;
        this.id = findAvailID();
    }
}

class Response{
    constructor(status, message, data = ""){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

// פונקציה שמוצאת איי די פנוי וחדש
function findAvailID() {
    const MmetingsLength = getInfo("meetings").length;
    const id = MmetingsLength + 1;
    return id;
}



// בודק האם קיים משתמש בשם הזה, אם לא מוסיף את המשתמש החדש
function addNewUser(username, password){
    const thisUser = getInfo("users", username);
    let response;

    if (thisUser === false) {
        const newuser = new User(username, password);
        const users = getInfo("users")
        users.push(newuser); 
        setInfo("users", users);

        response = new Response(200, "user was added succesfully", JSON.stringify(newuser));
    } else {
        response = new Response(404, "there is already a user with this name");
    }
    return response;
}


// הוספת פגישה חדשה
function addNewMeeting(name, time){
    let response;
    if(name === undefined || time === undefined) {
        response = new Response(404, "please fill name and or time");
    } else {
        const meetings = getInfo("meetings");
        const currentuser = getInfo("currentuser");
        const newMeeting = new Meeting(name, time);

        meetings.push(newMeeting); 
        setInfo("meetings", meetings);
    
        currentuser["meetings"].push(newMeeting.id);
        setInfo("currentuser", currentuser);
    
        currentUserToUsers(currentuser);
    
        response = new Response(200, "meeting added succesfully", JSON.stringify(newMeeting))
    }
    return response;
}



// מוחק פגישה
// function deleteMeeting(){
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


function deleteUser() {

}


function deleteMeeting(index) {
// אם קיים איידי כזזה, ואם הוא שלו אם כן
}






