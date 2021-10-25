import axios from "axios";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

const ValidateToken = (token) => {
    return new Promise(resolve => {
        let invalid_token = false;
        axios.get('http://104.131.97.145/Auth/StatusAuth', {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
            if(res.status != 200) {
                invalid_token = true;
            }
        })
        .catch(err => {
            invalid_token = true;
        }).then(() => {
            if(invalid_token) {
                resolve(false);
            }

            resolve(true);
        });

    });
}

const Backend = axios.create({
    baseURL: 'http://104.131.97.145',
    timeout: 0,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    transformRequest: (data, headers) => { 
        const cookies = new Cookies();
        if(data && !data.login) {
            // para todos los casos menos la request de login
            ValidateToken(cookies.get('session_jwt'))
                .then(valid_token => {
                    if(!valid_token) {
                        window.location.href = '/';
                    }
                });
        }
        return JSON.stringify(data);
    }
});


export default Backend;
export { ValidateToken }