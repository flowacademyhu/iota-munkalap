import getApi from './getApi';
import MockAdapter from "axios-mock-adapter";

let api = getApi();

var mock = new MockAdapter(api);

mock.onPost("/worksheets").reply(200);

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