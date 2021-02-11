import axios from 'axios';


const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

const api2 = axios.create({
    baseURL: `http://localhost:8081/api/`,
})

function getUsers() {
    return api2
        .get(`/users`);
}


function login(values) {
    return api2
        .post(`/login`, values);
}

function postUser(values) {
  return api2
      .post(`/users`, values);
}

export { getUsers, postUser, login };
