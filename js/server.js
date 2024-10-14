// בודק האם קיים משתמש בשם הזה, אם לא מוסיף את המשתמש החדש
function addNewUser(username, password){
    const thisUser = getInfo("users", username);

    if (thisUser === false) {
        const newuser = new User(username, password);
        const users = getInfo("users")
        users.push(newuser); 
        
    }

    for(let i=0; i<users.length; i++){
        if(users[i]["username"]===username){
            console.log("there is already a user with this name")
            return /*  */;
        }
    }

    const newuser = new User(username, password);
    users.push(newuser); 
    window.localStorage.setItem("users",JSON.stringify(users));
}



//add to local storge
function post(){

}


//take data from local storge
function get(){


}

//update data
function put(){
}


//delete data
function delete(){
    
}
