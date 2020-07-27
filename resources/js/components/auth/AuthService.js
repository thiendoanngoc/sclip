var decode = require('jwt-decode');

export default class AuthService {
    loggedIn() {
        const token = this.getToken()
        return !!token
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(token) {
        localStorage.setItem('sclip_user_token', token)
    }

    getToken() {
        return localStorage.getItem('sclip_user_token')
    }

    logout() {
        localStorage.removeItem('sclip_user_token')
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
