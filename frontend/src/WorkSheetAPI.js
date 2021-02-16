import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const api = axios.create({
    baseURL: `/api/`
})


function getWorkSheets() {
    return api
        .get(`worksheets`);
}

function postWorkSheet(credentials) {
    return api
        .post(`/worksheets`, credentials);
}

export {
    getWorkSheets,
    postWorkSheet,
}