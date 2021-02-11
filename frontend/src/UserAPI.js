import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

var mock = new MockAdapter(axios);

mock.onPost('/login').reply(200, { access_token: '12345' });



const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

const api2 = axios.create({
    baseURL: `http://localhost:8080/api/users/`,
})

const api3 = axios.create({
    baseURL: `https://reqres.in/api/`
})

async function loginUser(credentials) {
    const result = await api3.post('/login', credentials);
    return result.data.access_token;
}

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

export {
    getUsers,
    postUser,
    putUser,
    login,
    getUser,
    loginUser,
};
