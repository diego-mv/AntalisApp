import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import logo from '../../img/antalis-logo-white.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import OverlayAlert from "../layout/utils/overlay_alert";
import BackendWithoutAuth from "../backendWithoutAuth";

const RecuperatePassword = () => {
// 3) One liner - Get query string with '&' and without any library
    const getQueryParams = () => window.location.search.replace('?', '').split('&').reduce((r,e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {});

    const parameters = getQueryParams();
    const email = parameters.email;
    const token = parameters.token;

    return <RecuperatePasswordPage token={token} mail = {email} />;
}

const RecuperatePasswordPage = ({token, mail}) => {
    const [alert, setAlert] = useState({active: false, message: ""});
    const history = useHistory();
    const mail_ref = useRef();
    const psw_ref = useRef();
    const confirmPsw_ref = useRef();

    const handleSubmitForgoutPass = (event) => {
        event.preventDefault();
        setAlert({active: false, message: ""});
        const patternPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;¡ñ])(?=.{6,})");
            
        let alert_required = false;
        const required_fields = [mail_ref, psw_ref, confirmPsw_ref];
        required_fields.map(field => {
            field.current.classList.remove('required-field');
            if(!field.current.value) {
                alert_required = true;
                field.current.classList.add('required-field');
            }
        });
        if(alert_required) {
            setAlert({active: true, message: "Debe completar todos los campos."});
            return;
        } 
        if(psw_ref.current.value !== confirmPsw_ref.current.value){
            setAlert({active: true, message: "La contraseña no coincide."});
            return;
        }
        if(!patternPass.test(confirmPsw_ref.current.value)){
            setAlert({active: true, message: "La contraseña debe tener un largo mínimo de 6, tener al menos una mayuscula, una minuscula, un número y un símbolo."});
            return;
        }

        BackendWithoutAuth.post('/Auth/ResetPassword', {
            email: mail_ref.current.value,
            token: token,
            newPassword: psw_ref.current.value,
            confirmNewPassword: confirmPsw_ref.current.value
        })
        .then(res => {
            mail_ref.current.value = "";
            confirmPsw_ref.current.value = "";
            psw_ref.current.value = "";

            history.push("/");
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
                        <input type="text" className="form-control" placeholder="ejemplo@antalis.cl" ref={mail_ref} defaultValue={mail}/>
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-white">Nueva contraseña</label>
                        <input type="password" className="form-control"  ref={psw_ref}/>
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-white">Ingrese la contraseña nuevamente</label>
                        <input type="password" className="form-control"  ref={confirmPsw_ref}/>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary mb-2">Confirmar</button>
                    </div>
                </form>
                <small className="text-white">La contraseña debe contener al menos:</small>
                <ul className="text-white">
                <li><small>Un largo mínimo de 6 carácteres</small></li>
                            <li><small>Una letra mayúscula</small></li>
                            <li><small>Una letra minúscula</small></li>
                            <li><small>Un carácter especial</small></li>
                            <li><small>Un número</small></li>
                </ul>
                <div className="text-center">
                    <small className="text-muted">&copy; {new Date().getFullYear()} &ndash; Antalis</small>
                </div>
            </div>
        </div>
        </>
    );
}

export default RecuperatePassword;