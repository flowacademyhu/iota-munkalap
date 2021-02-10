import axios from 'axios';

const api = axios.create({
    baseURL: `https://localhost:8081/api`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function login(values) {
    return api
        .post(`/login`, values);
}

function postUser(values) {
    return api
        .post(`/users`, values);
}

function putUser(id, values) {
    return api
        .put(`/users/${id}`, values);
}

function putUserInactive(id) {
    return api
        .put(`/users/${id}`, {"isActive": false});
}

export { getUsers, postUser, putUser, login, putUserInactive };