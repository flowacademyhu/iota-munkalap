import getApi from './getApi';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

let api = getApi();

const api3 = axios.create({
    baseURL: `https://reqres.in/api/`
})

var mock = new MockAdapter(api);

mock.onPost("/worksheets").reply(200);


mock.onGet("/worksheets").reply(305);

function getWorkSheets() {
    return api3
        .get(`worksheets`);
}

function postWorkSheet(credentials) {
    return api3
        .post(`/worksheets`, credentials);
}

export {
    getWorkSheets,
    postWorkSheet,
}