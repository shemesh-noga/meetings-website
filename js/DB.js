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

// window.localStorage.clear();
// window.localStorage.setItem("users", JSON.stringify(users));
// window.localStorage.setItem("meetings", JSON.stringify(meetings));
// window.localStorage.setItem("currentuser", JSON.stringify(users[0]));


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
        this.id = JSON.parse(window.localStorage.getItem("meetings")).length + 1;
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





// הוספת פגישה חדשה
function addNewMeeting(name, time){
    const meetings=JSON.parse(window.localStorage.getItem("meetings"));
    const currentUser=JSON.parse(window.localStorage.getItem("currentUser"));
    const users=JSON.parse(window.localStorage.getItem("users"));

    const newMeeting = new Meeting(name, time);


    meetings.push(newMeeting); 
    window.localStorage.setItem("meetings",JSON.stringify(meetings));

    currentUser["meetings"].push(newMeeting.id);
    window.localStorage.setItem("currentUser", JSON.stringify(currentUser));

    for(let i = 0 ; i < users.length ; i ++) {
        if(users[i]["username"] === currentUser["username"]) {
            users[i]["meetings"].push(newMeeting.id)
            window.localStorage.setItem("users", JSON.stringify(users))
            break;
        }
    }
}


// מוחק פגישה
function deleteMeeting(id){
    const meetings=JSON.parse(window.localStorage.getItem("meetings"));
    const currentUser=JSON.parse(window.localStorage.getItem("currentUser"));
    const users=JSON.parse(window.localStorage.getItem("users"));

   for(let i = 0 ; i < meetings.length ; i ++){
        if(meetings[i].id === id) {
            meetings[i] = "";
            window.localStorage.setItem("meetings",JSON.stringify(meetings));
            break;
        }
   }

   for(let i = 0 ; i < currentUser["meetings"] ; i++){
        if(currentUser["meetings"][i] === id) {
            currentUser["meetings"].splice(i, 1);
            window.localStorage.setItem("currentUser", JSON.stringify(currentUser))
            break;
        }
   }

   currentUserToUsers(currentUser);
}



//מעדכן את הפגישה
function updateMeeting(id, key, value){
    const meetings=JSON.parse(window.localStorage.getItem("meetings"));
    for(let i = 0 ; i < meetings.length ; i ++){
        if(meetings[i]["id"] === id) {
            meetings[key] = value;
        }
    }
}


// פונקציה שמרוקנת את המשתמש הקיים
function disconnect() {
    window.localStorage.setItem("currentuser", "");
}



// פונקציות עזר

// פונקציה שמעדכנת את תוכן משתמש נוכחי למערך היוזרים
function currentUserToUsers(currentUser) {
    const users=JSON.parse(window.localStorage.getItem("users"));

    for(let i = 0 ; i < users.length ; i++) {
        if(users[i]["username"] === currentUser["username"]) {
            users[i] = currentUser;
            window.localStorage.setItem("users", users)
        }
    }

}


