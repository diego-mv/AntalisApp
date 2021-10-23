import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

const ValidateToken = async () => {
    const [cookies, setCookie, removeCookie] = useCookies(['session_jwt']);
    const history = useHistory();

    const token = cookies.session_jwt;
    let invalid_token = false;
    await axios.get('http://104.131.97.145/Auth/StatusAuth', {
        headers: {
            'Authorization': token,
            'Accept': 'application/json'
        }
    })
    .then(res => {
        if(res.status != 200) {
            invalid_token = true;
        }
    })
    .catch(err => {
        invalid_token = true;
    });

    if(invalid_token) {
        removeCookie('session_jwt');
        history.push('/');
    }
}

const Backend = axios.create({
        baseURL: 'http://104.131.97.145',
        timeout: 0,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        transformRequest: (data, headers) => { 
            if(!data.login) {
                ValidateToken();
            }
            return JSON.stringify(data);
        }
    });


export default Backend;
export { ValidateToken }