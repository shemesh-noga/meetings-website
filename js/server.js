//build class of response
class Response{
    constructor(status, message, data = ""){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}


// tairAndNoga/api/meetings/1

function server(objString) {
    const obj = JSON.parse(objString);
    const method = obj["method"];
    const url = obj["url"];
    if(obj["body"] === null) {
        body = null;
    } else {
        body = JSON.parse(obj["body"]);
    }
    let regMatch = url.match(/tairAndNoga\/api\/(.+)/)[1];
    let regex = /\//;
    let response;

    switch(method) {
        //in case of GET method
        case "GET":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/)[0];
                let index = regMatch.match(/\/(.+)/)[1];

                if(key === "currentuser") {
                    if(index === "meetings") {
                        let thisdata = getMeetings();
                        response = new Response(200, "got meetings of currentuser", thisdata);
                        console.log(thisdata);
                        return response;
                    } else {
                        const thisdata = getCurrentUserInfo(index)
                        response = new Response(200, "got username from currentuser", thisdata)
                        console.log(thisdata)
                        return response
                    }
                } else if(key !== "currentuser" && key !== "meetings" && key !== "users"){
                    response = new Response(404, `invalid ${key}`)
                    return response;
                } else {
                    const thisdata = getInfo(key, index)
                    response = new Response(200, `got meeting with id:${index}`, thisdata);
                    console.log(thisdata)
                    return response;
                }

            } else {
                if (regMatch !== "currentuser" && regMatch !== "meetings" && regMatch !== "users") {
                    response = new Response(404, `${regMatch} not found in local storage`);
                    return response;
                } else {
                    const thisdata = getInfo(regMatch);
                    response = new Response(200, `got ${regMatch}`, thisdata);
                    console.log(thisdata)
                    return response;
                }
            }
            break;

        //in case of POST method
        case "POST":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/)[0];
                let index = regMatch.match(/\/(.+)/)[1];

                if(key === "meetings" && index === "new") {
                    if(body["name"] === undefined || body["time"] === undefined || body["name"] === "" || body["time"] === "" ) {
                        response = new Response(404, "please fill name and or time");
                        console.log("error")
                        return response;
                    } else {
                        let thisdata = addNewMeeting(body["name"], body["time"]);
                        response = new Response(200, "meeting added succesfully", thisdata);
                        console.log(thisdata)
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
                        console.log(thisdata)
                        return response;
                    } else {
                        response = new Response(404, "there is already a user with this username");
                        console.log(response)
                        return response;
                    }
                }
                else if(regMatch === "login") {
                    const tryLogIn = getInfo("users", body["username"])
                    if(tryLogIn === false) {
                        response = new Response(404, `user doesn\'t exist`);
                        console.log(response);
                        return response;
                    } else if (JSON.parse(tryLogIn["password"]) !== body["password"]){
                        response = new Response(404, "wrong password");
                        console.log(response);
                        return response;
                    } else {
                        let thisdata = doLogIn(body);
                        response = new Response(200, `logged in succesfully into ${body["username"]}`, thisdata);
                        console.log(response);
                        return response;
                    }
                }
                else {
                    response = new Response(404, `tairAndNoga/api/${regMatch} not found`)
                    console.log(response);
                    return response;
                }
            }

            break;
        //in case of PUT method
        case "PUT":
            if(regex.test(regMatch)) {
                let key = regMatch.match(/^[^\/]+/)[0];
                let index = regMatch.match(/\/(.+)/)[1];
                if(key === "meetings") {
                    let thisdata = updateMeeting(body["id"], index, body[index])
                    response = new Response(200, `changed succesfully this meeting`, thisdata);
                    console.log(thisdata)
                    console.log(response);
                    return response;
                }
            } else {
                response = new Response(404, `${url} not found`, thisdata);
                console.log(response);
                return response;
            }

            break;
       //in case of DELETE method
        case "DELETE":
            if(regMatch === "meetings") {
                let thisdata = deleteMeeting(body["id"]);
                console.log(thisdata);
                response = new Response(200, "meeting deleted succesfully", thisdata);
                console.log(response);
                return response;
            } else {
                response = new Response(404, `${url} not found`);
                console.log(response);
                return response;
            }
            break;
    };
};









