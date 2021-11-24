import axios from "axios";

const BackendWithoutAuth = axios.create({
    baseURL: 'http://104.131.97.145',
    timeout: 0,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    transformRequest: (data, headers) => {
        return JSON.stringify(data);
    }
});


export default BackendWithoutAuth;