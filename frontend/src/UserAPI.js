import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios);

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function login(username, password) {
mock.onPost().reply(200);

    return api
        .post(`/users`, {username, password});
}

function postUser(values) {
  return api
      .post(`/users`, values);
}

export { getUsers, postUser, login };
