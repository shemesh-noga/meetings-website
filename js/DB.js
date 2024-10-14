let users=[
    {
        "username":"tair",
        "password":"1234",
        "meetings":[1]
    },
    {
        "username":"noga",
        "password":"5678",
        "meetings":[2,3]
    }
   
]

let meetings=[
    {
      "id":1,
      "name":"meeting with shlomo",
      "time":"20:00-22:00"
   },
   {
    "id":2,
    "name":"meeting with chana",
    "time":"10:00-12:00"
 },
 {
    "id":3,
    "name":"meeting with chen",
    "time":"14:00-17:00"
 }

];

window.localStorage.clear();
window.localStorage.setItem("users", JSON.stringify(users));
window.localStorage.setItem("meetings", JSON.stringify(meetings));
window.localStorage.setItem("currentuser", JSON.stringify(users[0]));


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
        this.id =  findAvailID();
    }
}


// פונקציה שמוצאת איי די פנוי וחדש
function findAvailID() {
    const MmetingsLength = getInfo("meetings").length;
    const id = MmetingsLength + 1;
    return id;
}



// פונקציה שמכניסה את מידע המשתמש הנוכחי למערך המשתמשים
function currentUserToUsers(currentUser) {
    const users = getInfo("users");

    for(let i = 0 ; i < users.length ; i++) {
        if(users[i]["username"] === currentUser["username"]) {
            users[i] = currentUser;
            setInfo("users", users)
        }
    }
}



// שליפת מידע
function getInfo(key, index){
    const value = JSON.parse(window.localStorage.getItem(key));
    if (index === undefined) {
        return value;
    } else {
        for(let i = 0 ; i < value.length ; i++) {
            if (index === value[i].id || index === value[i]["username"]) {
                return value[i];
            }
        } 
        return false;
    }
}



function getCurrentUserInfo(index) {
    const currentuser = JSON.parse(window.localStorage.getItem("currentuser"));
    if (index === undefined) {
        return currentuser;
    } else {
        return currentuser[index];
    }
}

console.log(getCurrentUserInfo())
console.log(getCurrentUserInfo("username"))

// פונקציה שמכניסה מידע
function setInfo(key, change){
    window.localStorage.setItem(key, JSON.stringify(change));
}


// שליפת פגישות של משתמש
function getMeetings(username){
    const users = getInfo("users");
    const meetings = getInfo("meetings");
    let returnedMeetings = []
    for(let i = 0 ; i < users.length ; i++){
        if(users[i]["username"] === username){
            let usersMeetings = users[i]["meetings"]

            for(let j = 0 ; j < usersMeetings.length ; j++) {
                for(let k = 0 ; k < meetings.length ; k++) {
                    if(usersMeetings[j] === meetings[k].id) {
                        returnedMeetings.push(meetings[k])
                    }
                }
            }
        }
        return returnedMeetings;
    }
    return false;
}


// הוספת פגישה חדשה
function addNewMeeting(name, time){
    const meetings = getInfo("meetings");
    const currentuser = getInfo("currentuser");
    const newMeeting = new Meeting(name, time);

    meetings.push(newMeeting); 
    setInfo("meetings", meetings);

    currentuser["meetings"].push(newMeeting.id);
    setInfo("currentuser", currentuser);

    currentUserToUsers(currentuser);
}


// מוסיף את המשתמש החדש
function addNewUser(username, password){
    const users = getInfo("users")
    const newuser = new User(username, password);

    users.push(newuser); 
    setInfo("users", users);
}



// נכנס למשתמש
function doLogIn(obj) {
    let username = obj["username"];
    let currentuser = getInfo("currentuser");
    const users = getInfo("users");
    for(let i = 0 ; i < users.length ; i++){
        if(users[i]["username"] === username) {
            currentuser = users[i];
            setInfo("currentuser", currentuser)
            break;
        }
    }
}





//מעדכן פגישה
function updateMeeting(id, key, value){
    const meetings=JSON.parse(window.localStorage.getItem("meetings"));
    for(let i = 0 ; i < meetings.length ; i ++){
        if(meetings[i]["id"] === id) {
            meetings[key] = value;
        }
    }
}


// מוחק פגישה
function deleteMeeting(id){
    const meetings = getInfo("meetings");
    const currentuser = getInfo("currentuser")

    for(let i = 0 ; i < meetings.length ; i++) {
        if(meetings[i]["id"] === id) {
            meetings[i] = "";
            break;
        }
    } setInfo("meetings", meetings);

    let ourIndex = currentuser["meetings"].findIndex((x) => x===id)
    currentuser["meetings"].splice(ourIndex, 1)
    setInfo("currentuser", currentuser)

    currentUserToUsers(currentuser);

    return meetings
}

// פונקציה שמרוקנת את המשתמש הקיים
function disconnect() {
    setInfo("currentuser", "");
}


