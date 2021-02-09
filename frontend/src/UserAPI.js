import axios from 'axios';

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

function getUsers() {
    return api
        .get(`/users`);
}

function postUser(values) {
  return api
      .post(`/users`, values);
}

export { getUsers, postUser };
