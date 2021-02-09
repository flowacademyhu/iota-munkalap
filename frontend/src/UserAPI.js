import axios from 'axios';

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function login() {
    return api
        .get(`username`);
}

export { getUsers, login }