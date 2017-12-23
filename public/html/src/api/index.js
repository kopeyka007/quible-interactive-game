import config from 'config';
import 'whatwg-fetch';

const BASIC_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const errorHandler = (response) => {
    if (!response.ok) throw Error(response.statusText);
    return response;
}

export default {
    fetchLoadInfo() {
        return fetch("/", {
            method: 'get',
            headers: BASIC_HEADERS,
            credentials: 'same-origin'
        })
        .then(errorHandler)
        .then(response => response.json());
    },
}
