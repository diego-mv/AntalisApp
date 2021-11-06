import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import { ValidateToken } from "./backend";
import Loading from "./loading";
import logo from '../img/antalis-logo-white.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const RecoverPassword = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();

    useEffect(() => {
        const checkSession = async () => {
            const valid_token = await ValidateToken(cookies.get('session_jwt', { path: '/' }));
            valid_token ? history.push('/layout') : setLoading(false);
        }
        checkSession();
    }, []);

    return loading ? <Loading /> : <RecoverPasswordPage />
}

const RecoverPasswordPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center h-100" id="login-background">
            <div className="bg-secondary p-5 rounded" id="recover-container">
                <div className="text-center mb-4">
                    <img src={logo} alt="Antalis logo" width="200px" />
                </div>

                <form className="p-2">
                    <h5 className="text-white mb-4 text-center">
                        <FontAwesomeIcon icon={faKey} className="me-2" />
                        Recuperar contraseña
                    </h5>

                    <div className="mb-4">
                        <label className="form-label text-white">Correo electrónico</label>
                        <input type="text" className="form-control" placeholder="ejemplo@antalis.cl" />
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
    );
}

export default RecoverPassword;