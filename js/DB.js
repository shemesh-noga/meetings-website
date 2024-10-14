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

// פונקציה שמכניסה מידע
function setInfo(key, change){
    window.localStorage.setItem(key, JSON.stringify(change));
}


// פונקציה שמוחקת מידע
function deleteInfo(index) {
    if(typeof index === string){
        const users = getInfo("users");
        for(let i = 0 ; i < users.length ; i++) {
            if(users[i]["username"] === index) {
                users.splice(i, 1)
                break;
            }
        }
        setInfo("users",users);
        setInfo("currentuser","");
    } 

    else {
        const meetings = getInfo("meetings");
        const currentuser = getInfo("currentuser")

        for(let i = 0 ; i < meetings.length ; i++) {
            if(meetings[i]["id"] === index) {
                meetings[i]="";
                break;
            }
        }

        currentuser["meetings"].

        setInfo("currentuser", )
        setInfo("meetings",meetings);

    }

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

// 




// פונקציה שמרוקנת את המשתמש הקיים
function disconnect() {
    window.localStorage.setItem("currentuser", "");
}




// פונקציות עזר
// פונקציה שמעדכנת את תוכן משתמש נוכחי למערך היוזרים
function currentUserToUsers(currentuser) {
    const users = getInfo("users");

    for(let i = 0 ; i < users.length ; i++) {
        if(users[i]["username"] === currentuser["username"]) {
            users[i] = currentuser;
            setInfo("users", users)
        }
    }

}
