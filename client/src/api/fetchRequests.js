const baseHref = "http://localhost:3000";

const getToken = () => window.sessionStorage.getItem("token");

// Standard is to set Authorization: "Bearer " + token in headers, for OAuth!

export const signIn = () =>
    fetch(baseHref + "/signin", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    }).then(response => response.json());

export const getProfile = (id) =>
    fetch(`${baseHref}/profile/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    }).then(resp => resp.json());

export const imageURL = (input) =>
    fetch(baseHref + "/imageurl", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify({
            input: input
        })
    }).then(response => response.json());

export const getImage = (userId) =>
    fetch(baseHref + "/image", {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify({
            id: userId
        })
    }).then(response => response.json());
