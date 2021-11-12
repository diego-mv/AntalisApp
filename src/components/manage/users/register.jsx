import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout";
import LoadingContent from "../../layout/loading_content";
import Backend from "../../backend";
import Select from "react-select";
import customStyleSelect from "../../layout/utils/custom_style_select";
import OverlayAlert from "../../layout/utils/overlay_alert";

const RegisterUser = () => {
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getRoles', {})
        .then(_roles => {
            setRoles(_roles.data.map(role => {
                return {
                    value: role.id,
                    label: role.name,
                    role: role.normalizedName
                }
            }));
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return loading ? <LoadingContent /> : <Layout content={<RegisterUserForm roles={roles} />} />;
}

const RegisterUserForm = ({ roles }) => {
    const client_info_ref = useRef();
    const technician_info_ref = useRef();

    const role_ref = useRef();
    const comuna_ref = useRef();

    const [alert, setAlert] = useState(null);

    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    const loadRegiones = () => {
        Backend.get('/Ubicacion/Regiones', {})
        .then(res => {
            setRegiones(res.data.map(region => {
                return {
                    value: region.id,
                    label: region.name
                }
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleRoleChange = (event) => {
        switch(event.role) {
            case 'CLIENTE':
                client_info_ref.current.classList.remove('d-none');
                technician_info_ref.current.classList.add('d-none');
                loadRegiones();
                break;
            case 'TECNICO':
                client_info_ref.current.classList.add('d-none');
                technician_info_ref.current.classList.remove('d-none');
                break;
            default:
                client_info_ref.current.classList.add('d-none');
                technician_info_ref.current.classList.add('d-none');
                break;
        }
    }

    const handleRegionChange = (event) => {
        comuna_ref.current.clearValue();
        Backend.get('/Ubicacion/Comunas', {
            params: {
                IdRegion: event.value
            }
        })
        .then(res => {
            setComunas(res.data.map(comuna => {
                return {
                    value: comuna.id,
                    label: comuna.name
                }
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }


    const submitUser = (event) => {
        event.preventDefault();

        const role = role_ref.current.getValue();
        console.log(role);
        setAlert(
            <OverlayAlert
                variant="danger"
                message="Debes seleccionar un rol"
                duration="3000"
            />
        );
        if(!role) {
            return;
        }
    }

    return (
        <div>
            {alert}
            <div className="my-2">
                <a className="link-primary" href="/manage/users">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Volver atrás
                </a>
            </div>
            <div className="card p-4 bg-white mx-auto" style={{maxWidth: '24rem'}}>
                <div className="px-2">
                    <h4 className="mb-0">
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        Registrar usuario
                    </h4>
                </div>

                <hr className="my-3" />

                <form onSubmit={submitUser}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="userName" maxLength="50" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" name="userEmail" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="userPhone" maxLength="30" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rol</label>
                        <Select options={roles} styles={customStyleSelect} onChange={handleRoleChange} ref={role_ref}
                            placeholder={'Seleccione un rol'} isSearchable={false} noOptionsMessage={() => 'Sin resultados'}
                        />
                    </div>

                    <div className="d-none mb-3" ref={client_info_ref}>
                        <p className="lead">Información cliente</p>

                        <div className="mb-3">
                            <label className="form-label">Código de cliente</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Región</label>
                            <Select options={regiones} styles={customStyleSelect} onChange={handleRegionChange}
                                placeholder={'Seleccione una región'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Comuna</label>
                            <Select options={comunas} styles={customStyleSelect} noOptionsMessage={() => 'Sin resultados'}
                                placeholder={'Seleccione una comuna'} isSearchable={true} ref={comuna_ref} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ciudad</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="d-none mb-3" ref={technician_info_ref}>
                        <p className="lead mb-2">Información técnico</p>

                        <div className="mb-3">
                            <label className="form-label">Empresa</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Es externo</label>
                        </div>
                    </div>

                    <div className="d-grid">
                        <input type="submit" className="btn btn-primary" value="Confirmar" />
                    </div>
                </form>

            </div>
        </div>
    );
}

export default RegisterUser;