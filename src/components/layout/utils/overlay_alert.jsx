import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";

const createUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const OverlayAlert = ({ variant, message, duration }) => {
    const styles = {
        position: 'fixed',
        zIndex: '100000',
        right: '1em',
        bottom: '1em'
    }

    const uuid = createUUID();

    const alert_ref = useRef();

    useEffect(() => {
        setInterval(() => {
            if(alert_ref.current) {
                alert_ref.current.classList.remove('alert-fade-in');
                alert_ref.current.classList.add('alert-fade-out');
            }
        }, duration);
    }, []);

    return (
        <div className={`alert alert-${variant} alert-fade-in`} role="alert"
            style={styles} ref={alert_ref} key={uuid}>
            {variant == 'success' ? <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> : <></>}
            {variant == 'info' ? <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> : <></>}
            {variant == 'warning' ? <FontAwesomeIcon icon={faExclamationCircle} className="me-2" /> : <></>}
            {variant == 'danger' ? <FontAwesomeIcon icon={faTimesCircle} className="me-2" /> : <></>}
            <small>
                {message}
            </small>
        </div>
    );
}

export default OverlayAlert;