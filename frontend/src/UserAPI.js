import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const api3 = axios.create({
    baseURL: `https://reqres.in/api/`
})

var mock = new MockAdapter(api3);

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
    }
});


const api = axios.create({
    baseURL: `/api/`,
})


async function loginUser(credentials) {
    try {
        const result = await api.post('/login', credentials);
        return result.data.access_token;
    } catch (error) {
        alert('A belépés sikertelen.');
    }
}

function getUsers() {
    return api
        .get(`/users`);
}

function getWorkSheets() {
    return api
        .get(`worksheets`);
}

function postWorkSheet(credentials) {
    return api
        .post(`/worksheets`, credentials);
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


export {
    getUsers,
    postUser,
    putUser,
    putUserInactive,
    getUser,
    loginUser,
    getWorkSheets,
    postWorkSheet,
};