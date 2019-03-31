import axios from "axios";
import jwtDecode from "jwt-decode";
import config from '../config'

const USERS_BASE_URL = `${config.BASE_URL}/users`;

async function login(email, password) {
    const { data: jwt } = await axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: USERS_BASE_URL + "/login",
        data: {
            email: email,
            password: password
        }
    });
    localStorage.setItem("token", jwt);
}

function getCurrentUserId() {
    try {
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt).unique_name;
    } catch (ex) {
        return null;
    }
}

function logout() {
    try {
        localStorage.removeItem("token");
    } catch (ex) { }
}

function includeAuth(request) {
    let jwt = "";
    try {
        jwt = localStorage.getItem("token");
    } catch (ex) { }

    if (request.headers) {
        request.headers["Authorization"] = "Bearer " + jwt;
    } else {
        request.headers = { Authorization: "Bearer " + jwt };
    }
    return request;
}

export default {
    login,
    logout,
    getCurrentUserId,
    includeAuth
};
