import axios from 'axios';

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function login(username, password) {
    return api
        .post(`/users`, {username, password});
}

export { getUsers, login }