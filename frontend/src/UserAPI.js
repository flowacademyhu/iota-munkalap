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

function login(values) {
mock.onPost().reply(200);

    return api2
        .post(`/login`, values);
}

function postUser(values) {
  return api
      .post(`/users`, values);
}

export { getUsers, postUser, login };
