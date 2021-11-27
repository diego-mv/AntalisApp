import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../helpers/getData";


const LoggedAs = () => {
    const [username, setUsername] = useState('Usuario');

    useEffect(() => {
        setUsername(getCurrentUser().fullname);
    }, []);

    return (
        <>
            <div className="small">Sesión iniciada como:</div>
            {username}
        </>
    );
}

export default LoggedAs;