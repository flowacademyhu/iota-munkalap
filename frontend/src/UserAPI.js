import axios from 'axios';


const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

const api2 = axios.create({
    baseURL: `http://localhost:8081/api/`,
headers: {"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKdXJQeF8xcUNPX3hNNVpSLTE1NFpxTXR4WW5OR1hpZXlKNmZYVmZqaDFNIn0.eyJleHAiOjE2MTMwNDI1MzcsImlhdCI6MTYxMzA0MjIzNywianRpIjoiNGNlNzMyYjUtMDNjZS00Njk3LTg3YWYtNjZiYjhhYTZjZGZmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3dvcmtzaGVldCIsInN1YiI6IjdjZWRlZDc4LWEzOWItNDEwMi1iNTlhLTBjOTg4ODEyYjI4YSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsInNlc3Npb25fc3RhdGUiOiJjMmY0OGUzMS1lMjZjLTQxODgtYWI4Yy1kMjExYzg2YzUzZDIiLCJhY3IiOiIxIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiU8OhbmRvciAgUGV0xZFmaSIsInByZWZlcnJlZF91c2VybmFtZSI6InBldMWRZmlwZXRvZmlAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlPDoW5kb3IgIiwiZmFtaWx5X25hbWUiOiJQZXTFkWZpIiwiZW1haWwiOiJwZXRvZmlAZ21haWwuY29tIn0.JSg1U_xEgG0hU1G2KlNTq1NfS4hWxwQiGWSl5eyA-DtUMRdVCq1vpyihclUm9yds1mhUVzgIlT6XgIZjyZ-dzm89-RAYc-tX3g88hyGEi22PmFbYJX4oFfGEtVNDH8DdbP-NEQBnZNDBsC0JKFwJWi-6dTbzlbgcJ64O0Tz4YcEuqp5rTAyOL1QPFzvk2uJwRS6ZhtllMtJ_eRHKP65-Z_roMPbOf12M77WyYPkoDBfSmtK4TkABT3jIsxj26Qb3fhsLv-yHZh19r4pIKZ3woXiua6CRXCKummAoo3uUU2OjNEvJtlJAt8NuqnHmW22owjiFObviItuRkMQ-To8a8Q"}
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
