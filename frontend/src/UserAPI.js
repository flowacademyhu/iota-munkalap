import axios from 'axios';
//import MockAdapter from "axios-mock-adapter";


const api3 = axios.create({
    baseURL: `https://reqres.in/api/`
})

// var mock = new MockAdapter(api3);
// mock.onPost('/login').reply(200, { access_token: '12345' });

const api = axios.create({
    baseURL: `/api/`,
})

// const api = axios.create({
//     baseURL: `http://localhost:8081/api/`,
//     headers: { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKdXJQeF8xcUNPX3hNNVpSLTE1NFpxTXR4WW5OR1hpZXlKNmZYVmZqaDFNIn0.eyJleHAiOjE2MTMxNDUwNDUsImlhdCI6MTYxMzEyNzA0NSwianRpIjoiNWExZTQ1NGMtNzg1MC00MTFmLWJjMDItODZiNTZlZGJmYTY2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3dvcmtzaGVldCIsInN1YiI6IjUzN2ViNjJkLWI4ZmEtNDhiNC1iNjg5LTE3ODlkMTdlMWQ0OCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsInNlc3Npb25fc3RhdGUiOiJhYTNlYTVhMS0yM2VjLTRmNWUtOWJkOS05MTI3ZWE3YTRmMWIiLCJhY3IiOiIxIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHN1cGVyYWRtaW4uaHUifQ.PzaX238U4OYmX8pakb5lapy0qG4qXNSxF0RLdnKKcgIt_lTepHtXR7N27TmFrGPc166YOx3lqTodnv8s1J13308Y4V4pZi6odtEtgDSUGn5Q60wqtqVQikMioYKLJty-NFyJOjEHKpcusIdUP5ik2-nmQbxq8jYZLBNqlO0OT20XMNwUtqYmL9u66P-PPWvCn4eAzYUgZTgH5pmxikD5FW9R584poJ9Njs_Ok6CydYmaq4Oe54AA6bgM7ikeDq31zn6cumDrTJ_MlbKXZqZWZUb200S3PQQQHZDuQ0-odwA6ExK5ynKBqTd7v1YD8sc_NH9FOywmkkNGvlwaVFNnGg" }
// })

async function loginUser(credentials) {
    try {
        const result = await api.post('/login', credentials);
        console.log(result.data.access_token)
        return result.data.access_token;
    } catch (error) {
        alert('A belépés sikertelen.');
    }
}

function getUsers() {
    return api
        .get(`/users`);
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
        .put(`/users/${id}`, { "isActive": false });
}
function getUser(id) {
    return api
        .get(`/users/${id}`);
}

export { getUsers, postUser, putUser, putUserInactive, getUser, loginUser };