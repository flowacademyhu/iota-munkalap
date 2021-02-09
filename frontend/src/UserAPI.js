import axios from 'axios';
var MockAdapter = require("axios-mock-adapter");
var mock = new MockAdapter(axios);

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function postUser(values) {
    mock.onPost().reply(400);
  return api
      .post(`/users`, values);
}

export { getUsers, postUser };
