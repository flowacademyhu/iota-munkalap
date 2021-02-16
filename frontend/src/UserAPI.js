import axios from 'axios';

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
        .get(`api/users?status=${status}`);
        //Ez tedd a pathhez: users?status=${status}&page=${page}&q=${q}
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

export { 
    getUsers, 
    postUser, 
    putUser, 
    putUserInactive, 
    getUser, 
    loginUser 
};