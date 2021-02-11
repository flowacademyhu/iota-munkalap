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
    try {
        const result = await api3.post('/login', credentials);
        return result.data.access_token;
    } catch (error) {
        alert('A belépés sikertelen.');
    }   
}

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

export { getUsers, postUser, putUser, login, putUserInactive, getUser };