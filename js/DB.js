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

class User{
    constructor(username, password){
        this.username=username;
        this.password=password;
        this.meetings=[];
    }
}


function checkSignUp(username, password){
    const users=JSON.parse(window.localStorage.getItem("users"));
    for(let i=0; i<users.length; i++){
        if(users[i]["username"]===username){
            return /*  */;
        }
    }

    const newuser = new User(username, password);
    users.push(newuser); 
    window.localStorage.setItem("users",JSON.stringify(users));
}



































