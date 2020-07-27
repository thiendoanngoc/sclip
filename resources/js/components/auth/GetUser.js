import { handleResponse } from "../../_helpers/handle-response";

export function getUser(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization' :`Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    };

    return fetch('/api/user', requestOptions)
        .then(handleResponse)
}