import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import logo from '../img/antalis-logo-white.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import OverlayAlert from "./layout/utils/overlay_alert";
import BackendWithoutAuth from "./backendWithoutAuth";

const RecoverPassword = () => {
    const history = useHistory();

    return <RecoverPasswordPage />
}

const RecoverPasswordPage = () => {
    const [alert, setAlert] = useState({active: false, message: ""});
    const mail_ref = useRef();

    const handleSubmitForgoutPass = (event) => {
        event.preventDefault();
        
        if(mail_ref.current.value === "") {
            setAlert({active: true, message: "Debe ingresar su correo electrónico."});
            return;
        }

        BackendWithoutAuth.get('/Auth/ForgotPassword', {
            params: {
                Email: mail_ref.current.value
            }
        })
        .then(res => {
            
            mail_ref.current.value = "";
        })
        .catch(err => {
            setAlert({active: true, message: "Ha ocurrido un error, intente nuevamente."});
        });
    };

    return (
        <>
        {alert.active ? <OverlayAlert variant="danger" duration="3000" message={alert.message}></OverlayAlert> : null}
        <div className="d-flex align-items-center justify-content-center h-100" id="login-background">
            <div className="bg-secondary p-5 rounded" id="recover-container">
                <div className="text-center mb-4">
                    <img src={logo} alt="Antalis logo" width="200px" />
                </div>

                <form className="p-2" onSubmit={handleSubmitForgoutPass}>
                    <h5 className="text-white mb-4 text-center">
                        <FontAwesomeIcon icon={faKey} className="me-2" />
                        Recuperar contraseña
                    </h5>

                    <div className="mb-4">
                        <label className="form-label text-white">Correo electrónico</label>
                        <input type="text" className="form-control" placeholder="ejemplo@antalis.cl" ref={mail_ref}/>
                        <div className="form-text text-white">
                            Si su correo electrónico se encuentra asociado a una cuenta, se le hará llegar instrucciones sobre cómo reestablecer su contraseña
                        </div>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary mb-2">Confirmar</button>
                        <a href="/" className="btn btn-outline-primary">Volver al inicio</a>
                    </div>
                </form>

                <div className="text-center">
                    <small className="text-muted">&copy; {new Date().getFullYear()} &ndash; Antalis</small>
                </div>
            </div>
        </div>
        </>
    );
}

export default RecoverPassword;