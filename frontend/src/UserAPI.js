import axios from 'axios';
import MockAdapter from "axios-mock-adapter";


const api3 = axios.create({
    baseURL: `https://reqres.in/api/`
})

var mock = new MockAdapter(api3);
mock.onPost('/login').reply(200, { access_token: '12345' });

mock.onGet(`/users`).reply(200, {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }});


const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

const api2 = axios.create({
    baseURL: `http://localhost:8081/api/`,
headers: {"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKdXJQeF8xcUNPX3hNNVpSLTE1NFpxTXR4WW5OR1hpZXlKNmZYVmZqaDFNIn0.eyJleHAiOjE2MTMwNDI1MzcsImlhdCI6MTYxMzA0MjIzNywianRpIjoiNGNlNzMyYjUtMDNjZS00Njk3LTg3YWYtNjZiYjhhYTZjZGZmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3dvcmtzaGVldCIsInN1YiI6IjdjZWRlZDc4LWEzOWItNDEwMi1iNTlhLTBjOTg4ODEyYjI4YSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsInNlc3Npb25fc3RhdGUiOiJjMmY0OGUzMS1lMjZjLTQxODgtYWI4Yy1kMjExYzg2YzUzZDIiLCJhY3IiOiIxIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiU8OhbmRvciAgUGV0xZFmaSIsInByZWZlcnJlZF91c2VybmFtZSI6InBldMWRZmlwZXRvZmlAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlPDoW5kb3IgIiwiZmFtaWx5X25hbWUiOiJQZXTFkWZpIiwiZW1haWwiOiJwZXRvZmlAZ21haWwuY29tIn0.JSg1U_xEgG0hU1G2KlNTq1NfS4hWxwQiGWSl5eyA-DtUMRdVCq1vpyihclUm9yds1mhUVzgIlT6XgIZjyZ-dzm89-RAYc-tX3g88hyGEi22PmFbYJX4oFfGEtVNDH8DdbP-NEQBnZNDBsC0JKFwJWi-6dTbzlbgcJ64O0Tz4YcEuqp5rTAyOL1QPFzvk2uJwRS6ZhtllMtJ_eRHKP65-Z_roMPbOf12M77WyYPkoDBfSmtK4TkABT3jIsxj26Qb3fhsLv-yHZh19r4pIKZ3woXiua6CRXCKummAoo3uUU2OjNEvJtlJAt8NuqnHmW22owjiFObviItuRkMQ-To8a8Q"}
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

function searchUser(string) {
    return api
        .get(`/users/${string}`)
}

export { getUsers, postUser, putUser, putUserInactive, getUser, loginUser, searchUser };