import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios);

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

mock.onPost().reply(200);

function login(values) {
    return api2
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

export { getUsers, postUser, putUser, login };
