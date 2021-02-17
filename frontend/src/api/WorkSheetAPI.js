import api from './createApi';
import MockAdapter from "axios-mock-adapter";

var mock = new MockAdapter(api);

const workSheets = [
    { id: '1', creater: 'employee1', date: '2020.12.01.', partner: 'partner1', type: 'type1', state: 'state1' },
    { id: '2', creater: 'employee2', date: '2020.08.11.', partner: 'partner2', type: 'type2', state: 'state2' },
    { id: '3', creater: 'employee3', date: '2000.12.01.', partner: 'partner3', type: 'type3', state: 'state3' },
    { id: '4', creater: 'employee4', date: '2010.08.11.', partner: 'partner4', type: 'type4', state: 'state4' }
]

mock.onGet("/worksheets").reply(200, workSheets)
    .onAny()
    .passThrough();

//mock.onPost("/worksheets").reply(200);


function getWorkSheets() {
    return api
        .get(`/worksheets`);

};


function postWorkSheet(credentials) {
    return api
        .post(`/worksheets`, credentials);
}
export {
    getWorkSheets,
    postWorkSheet,

}

