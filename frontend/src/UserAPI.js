import axios from 'axios';

const api = axios.create({
    baseURL: `https://localhost:8081/api`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function login(credentials) {
    return api
        .post(`/login`, credentials);
}

function postUser(credentials) {
    return api
        .post(`/users`, credentials);
}

function putUser(id, credentials) {
    return api
        .put(`/users/${id}`, credentials);
}

function putUserInactive(id) {
    return api
        .put(`/users/${id}`, {"isActive": false});
}
function getUser(id) {
    return api
        .get(`/users/${id}`);
}

export { getUsers, postUser, putUser, login, putUserInactive };