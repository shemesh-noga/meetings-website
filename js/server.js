class Response{
    constructor(status, message, data = ""){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}



// // tairAndNoga/api/meetings/1

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

                if(key === "meetings" && index === "new") {
                    if(body["name"] === undefined || body["time"] === undefined || body["name"] === "" || body["time"] === "" ) {
                        response = new Response(404, "please fill name and or time");
                        return response;
                    } else {
                        let thisdata = addNewMeeting(body["name"], body["time"]);
                        response = new Response(200, "meeting added succesfully", thisdata);
                        return response;
                    }
                } else {
                    response = new Response(404, `${url} not found`)
                    return response;
                }
            } else {
                if(regMatch === "signin") {
                    const thisUser = getInfo("users", body["username"]);

                    if (thisUser === false) {
                        let thisdata = addNewUser(body["username"], body["password"]);
                        response = new Response(200, "user was added succesfully", thisdata);
                        return response;
                    } else {
                        response = new Response(404, "there is already a user with this username");
                        return response;
                    }
                }
                else if(regMatch === "login") {
                    const tryLogIn = getInfo("users", body["username"])
                    if(tryLogIn === false) {
                        response = new Response(404, `user doesn\'t exist`);
                        return response;
                    } else if (tryLogIn["password"] !== body["password"]){
                        response = new Response(404, "wrong password");
                        return response;
                    } else {
                        let thisdata = doLogIn(body);
                        response = new Response(200, `logged in succesfully into ${body["username"]}`, thisdata);
                        return response;
                    }
                }
                else {
                    response = new Response(404, `tairAndNoga/api/${regMatch} not found`)
                    return response;
                }
            }

            break;

        case "PUT":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/);
                let index = regMatch.match(/\/(.+)/);
                if(key === "meetings") {
                    let thisdata = updateMeeting(body["id"], body["key"], body["value"])
                    response = new Response(200, `changed succesfully this meeting`, thisdata);
                    return response;
                }
            } else {
                response = new Response(404, `${url} not found`, thisdata);
                return response;
            }

            break;

        case "DELETE":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/);
                let index = regMatch.match(/\/(.+)/);

                if(key === "meetings") {
                    let thisdata = deleteMeeting(body.id);
                    response = new Response(200, "meeting deleted succesfully", thisdata);
                    return response;
                }
            } else {
                response = new Response(404, `${url} not found`);
                return response;
            }
            break;
    }
}










