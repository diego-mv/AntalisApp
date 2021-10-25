import React, { useRef, useState, useEffect } from 'react';
import logo from '../img/antalis-logo.png';
import logo_white from '../img/antalis-logo-white.png';
import Backend, { ValidateToken } from './backend';
import { Alert } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import Loading from './loading';

const Login = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();

    useEffect(() => {
        const checkSession = async () => {
            const valid_token = await ValidateToken(cookies.get('session_jwt'));
            valid_token ? history.push('/layout') : setLoading(false);
        }
        checkSession();
    }, []);

    return loading ? <Loading /> : <LoginPage />
}

const LoginPage = () => {
    const email_ref = useRef();
    const email_req_ref = useRef();
    const password_ref = useRef();
    const password_req_ref = useRef();

    const remember_me_ref = useRef();
    const remember_me_email = localStorage.getItem('remember_me_email');

    const [alerts, setAlerts] = useState([]);
    const history = useHistory();
    const cookies = new Cookies();

    const handleSubmit = e => {
        e.preventDefault();
        setAlerts([]);
        const email_val = email_ref.current.value;
        const password_val = password_ref.current.value;
        let failed = false;

        if(!password_val) {
            password_req_ref.current.className = password_req_ref.current.className.replace('d-none', '');
            password_ref.current.focus();
            failed = true;
        } else {
            password_req_ref.current.className += ' d-none';
        }

        if(!email_val) {
            email_req_ref.current.className = email_req_ref.current.className.replace('d-none', '');
            email_ref.current.focus();
            failed = true;
        } else {
            email_req_ref.current.className += ' d-none';
        }

        if(failed) { return; }

        const remember_me = remember_me_ref.current.checked;
        localStorage.setItem('remember_me_email', remember_me ? email_val : '');

        Backend.post('/Auth/Login', {
            email: email_val,
            password: password_val,
            login: true
        })
        .then(res => {
            const token = 'Bearer ' + res.data.token;
            cookies.set('session_jwt', token);
            Backend.defaults.headers.common['Authorization'] = token;

            Backend.get('/Accounts/getUsers', {
                params: {
                    email: email_val
                }
            })
            .then(users => {
                let user = users.data.find(_user => _user.email == email_val);
                localStorage.setItem('current_user', JSON.stringify(user));
            });

            history.push('/layout');
        })
        .catch(err => {
            // alert user
            setAlerts([{
                msg: 'Las credenciales son incorrectas o el correo no se encuentra registrado',
                variant: 'danger'
            }]);
        });
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" id="login-background">
            <div id="login-container" className="row no-gutters">
                <div className="col bg-white p-5 rounded-start d-md-flex d-none justify-content-center align-items-center">
                    <img src={logo} alt="Antalis logo" width="280px" />
                </div>
                <div className="col bg-secondary p-5 rounded-end">
                    <div className="d-block d-md-none text-center">
                        <img src={logo_white} alt="Antalis logo" width="260px" />
                    </div>
                    <form className="p-3" onSubmit={handleSubmit}>
                        <h4 className="text-white mb-4 text-center d-none d-md-block">
                            Sistema de gestión de servicio técnico
                        </h4>
                        <h5 className="text-white mb-4 text-center d-block d-md-none">
                            Sistema de gestión de servicio técnico
                        </h5>

                        {alerts.map((item, index) => {
                            return (
                                <Alert variant={item.variant} key={index} className="my-2">
                                    <small>{item.msg}</small>
                                </Alert>
                            );
                        })}

                        <div className="mb-2">
                            <label className="form-label text-white">Correo electrónico</label>
                            <input ref={email_ref} type="text" className="form-control" placeholder="ejemplo@antalis.cl"
                                defaultValue={remember_me_email} />
                            <small ref={email_req_ref} className="text-primary d-none">* Campo requerido</small>

                            <div className="form-check mt-1">
                                <input ref={remember_me_ref} className="form-check-input" type="checkbox"
                                    defaultChecked={remember_me_email ? true : false} />
                                <label className="form-check-label text-white">Recordar correo electrónico</label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-white">Contraseña</label>
                            <input ref={password_ref} type="password" className="form-control" placeholder="" />
                            <small ref={password_req_ref} className="text-primary d-none">* Campo requerido</small>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Ingresar</button>
                            <small className="text-white text-center">¿Olvidó su contraseña? Recupérela <a href="#" className="link-primary">aquí</a></small>
                        </div>
                    </form>
                    <div className="text-center">
                        <small className="text-muted">&copy; {new Date().getFullYear()} &ndash; Antalis</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;