import axios from 'axios';

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

const api2 = axios.create({
    baseURL: `http://localhost:8080/api/users/`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function login(values) {
    return api2
        .post(`/login`, values);
}

function postUser(values) {
    return api
        .post(`/users`, values);
}

function getUser(id) {
    return api
        .get(`/users/${id}`);
}

function putUser(id, values) {
    return api
        .put(`/users/${id}`, values);
}

export { getUsers, postUser, putUser, login, getUser };
