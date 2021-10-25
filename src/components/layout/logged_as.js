import React, { useState, useEffect } from "react";

const getFullName = () => {
    return new Promise(resolve => {
        try {
            const user = JSON.parse(localStorage.getItem('current_user'));
            resolve(user.fullname);
        } catch(e) {
            resolve(null);
        }
    });
}

const LoggedAs = () => {
    const [username, setUsername] = useState('Usuario');

    useEffect(() => {
        getFullName().then(fullName => {
            if(fullName) setUsername(fullName);
        });
    }, []);

    return (
        <>
            <div className="small">Sesión iniciada como:</div>
            {username}
        </>
    );
}

export default LoggedAs;