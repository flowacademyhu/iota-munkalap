import axios from 'axios';

const getRoot = `https://jsonplaceholder.typicode.com/users`;

function GetUsers() {
    return axios
        .get(getRoot);
}

export { GetUsers }