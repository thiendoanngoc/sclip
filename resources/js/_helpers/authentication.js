import { handleResponse } from './handle-response'
var jwt_decode = require('jwt-decode');

const apiUrl = 'http://127.0.0.1:8000'
const currentUserSubject = sessionStorage.getItem('sclip_user_token')

export const authenticationService = {
    loggedIn,
    _checkStatus,
    getToken,
    setToken,
    login,
    setTokenToUser,
    logout,
    getUser,
    checkToken,
    isTokenExpired,
    currentUser: currentUserSubject,
    get currentUserValue() { return currentUserSubjects }
};

function setToken(token) {
    sessionStorage.setItem('sclip_user_token', JSON.stringify(token))
}

function getToken() {
    return JSON.parse(sessionStorage.getItem('sclip_user_token'))
}

function _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function isTokenExpired(token) {
    try {
        const decoded = jwt_decode(token)
        if (decoded.exp > Date.now() / 1000) {
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}

function loggedIn() {
    const token = this.getToken()
    return !!token
}

// function login(username, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//     };

//     return fetch(`${config}/api/login`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             localStorage.setItem('sclip_user_token', JSON.stringify(user))
//             return user
//         })
// }

function login(username, password) {
    return axios.post(`${apiUrl}/api/login`, {
        username: username,
        password: password
    }).then(response => {return response.data}).catch(error => {return error.response})
}

function setTokenToUser(token, id) {
    axios.post(`${apiUrl}/api/setToken`, {
        token: token,
        id: id,
    }).then(response => {
        if(response.data.status == 'success') {
            return true
        }
        else {
            return false
        }
    })
    .catch(error => {
        return error.response
    })
}

async function checkToken(token, id) {
    let data = {
        token: token,
        id: id,
    }

    try {
        let res = await axios.post(`${apiUrl}/api/checkToken`, data)
        return res.data
    }
    catch (err) {
        return err
    }
}

function logout() {
    sessionStorage.removeItem('sclip_user_token');
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization' :`Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    };

    return fetch(`${config}/api/user`, requestOptions)
        .then(handleResponse)
}