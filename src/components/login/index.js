import React from 'react';
import logo from '../../img/antalis-logo.png';

const LoginPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-lightgray">
            <div id="login-card" className="container rounded p-0 m-0">
                <div className="row no-gutters">
                    <div className="col bg-white p-5 rounded-start d-flex justify-content-center align-items-center">
                        <img src={logo} alt="Antalis logo" width="280px" />
                    </div>
                    <div className="col bg-secondary p-5 rounded-end">
                        <form className="p-3">
                            <h4 className="text-white mb-4 text-center">Iniciar sesión</h4>

                            <div className="mb-2">
                                <label className="form-label text-white">Correo electrónico</label>
                                <input type="text" className="form-control" placeholder="john.doe@mail.com" />
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-white">Contraseña</label>
                                <input type="password" className="form-control" placeholder="" />
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Ingresar</button>
                                <small className="text-white text-center">¿Olvidó su contraseña? Recupérela <a href="#" className="link-primary">aquí</a></small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;