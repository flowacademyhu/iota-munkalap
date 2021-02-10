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

function putUser(id, values) {
    return api
        .put(`/users/${id}`, values);
}

export { getUsers, postUser, putUser };