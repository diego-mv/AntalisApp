import React from "react";
import { useState, useEffect, useRef } from "react";
import Layout from "../../layout";
import Backend from "../../backend";
import Loading from "../../loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import customStyleSelect from "../../layout/utils/custom_style_select";
import Select from "react-select";
import { Badge } from "react-bootstrap";

const EditUser = ({ match }) => {
    // const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getUser', {
            params: {
                IdUser: match.params.id
            }
        })
        .then(res => {
            // setUser(res.data);

            Backend.get('/Accounts/getRoles', {})
            .then(_roles => {
                setRoles(_roles.data.map(role => {
                    return {
                        value: role.id,
                        label: role.name,
                        role: role.normalizedName
                    }
                }));
                setUser(res.data);
                // setLoading(false);
            })
            .catch(err => {
                console.log(err);
                // setLoading(false);
            });
        })
        .catch(err => {
            console.log(err);
            // setLoading(false);
        });
    }, []);

    return !user ? <Loading /> : <Layout content={<EditUserForm user={user} roles={roles} />} />;
}

const EditUserForm = ({ user, roles }) => {
    const client_info_ref = useRef();
    const technician_info_ref = useRef();

    const userName_ref = useRef();
    const userEmail_ref = useRef();
    const role_ref = useRef();

    const [isEnabled, setIsEnabled] = useState(user.isEnabled);
    const [clientInfo, setClientInfo] = useState(null);
    const [techInfo, setTechInfo] = useState(null);

    const techExtern_ref = useRef();
    const techCompany_ref = useRef();
    const techCompanyInput_ref = useRef();

    const clientCode_ref = useRef();
    const clientRegion_ref = useRef();
    const clientComuna_ref = useRef();
    const clientCity_ref = useRef();
    const clientAddress_ref = useRef();

    const [alert, setAlert] = useState(null);

    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    useEffect(() => {
        if(user.role == 'CLIENTE') {
            Backend.get('/Accounts/GetCliente', {
                params: {
                    IdUser: user.id
                }
            })
            .then(res => {
                // console.log(res);
                // const setRegionComuna = async () => {
                //     console.log('regiones 1', regiones);
                //     await loadRegiones();
                //     console.log('regiones 2', regiones);
                //     clientRegion_ref.current.setValue(regiones.find(region => region.value == res.data.region));
                //     await handleRegionChange({value: res.data.region});
                //     clientComuna_ref.current.setValue(comunas.find(comuna => comuna.value == res.data.comuna));
                // }
                // setRegionComuna();
                console.log('GetCliente');
                setClientInfo(res.data);
                loadRegiones();
            })
            .catch(err => {
                console.log(err);
            });
        } else if(user.role == 'TECNICO') {
            Backend.get('/Accounts/GetTecnico', {
                params: {
                    IdUser: user.id
                }
            })
            .then(res => {
                console.log(res);
                setTechInfo(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, []);

    useEffect(() => {
        if(!clientInfo) return;
        clientRegion_ref.current.setValue(regiones.find(region => region.value == clientInfo.region));
        handleRegionChange({value: clientInfo.region});
    }, [regiones]);

    useEffect(() => {
        if(!clientInfo) return;
        clientComuna_ref.current.setValue(comunas.find(comuna => comuna.value == clientInfo.comuna));
    }, [comunas]);

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

    const handleRegionChange = (event) => {
        console.log(event);
        clientComuna_ref.current.clearValue();
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

    const handleEsExterno = (event) => {
        if(event.target.checked) {
            techCompany_ref.current.classList.remove('d-none');
        } else {
            techCompany_ref.current.classList.add('d-none');
        }
    }

    return (
        <div>
            <div className="my-2">
                <a className="link-primary" href="/manage/users">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Volver atrás
                </a>
            </div>
            <div className="card p-4 bg-white mx-auto" style={{maxWidth: '24rem'}}>
                <div className="px-2">
                    <h4 className="mb-0">
                        <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                        Editar usuario
                    </h4>
                </div>

                <hr className="my-3" />

                <form>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="userName" maxLength="50" className="form-control field"
                            ref={userName_ref} defaultValue={user.fullname} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" name="userEmail" className="form-control field"
                            ref={userEmail_ref} defaultValue={user.email} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="userPhone" maxLength="30" className="form-control field"
                            defaultValue={user.phone} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rol</label>
                        <Select options={roles} styles={customStyleSelect} onChange={handleRoleChange} ref={role_ref}
                            placeholder={'Seleccione un rol'} isSearchable={false} noOptionsMessage={() => 'Sin resultados'}
                            defaultValue={roles.filter(role => role.role == user.role)}
                        />
                    </div>

                    <div className="mb-3">
                        <span className="me-2">Estado</span>
                        <Badge pill bg={isEnabled ? 'success' : 'danger'}>
                            {isEnabled ? 'Activo' : 'Inactivo'}
                        </Badge>
                    </div>

                    <div ref={client_info_ref}
                        className={'mb-3 ' + (user.role == 'CLIENTE' ? '' : 'd-none')}>
                        <p className="lead">Información cliente</p>

                        <div className="mb-3">
                            <label className="form-label">Código de cliente</label>
                            <input type="text" className="form-control field"
                                ref={clientCode_ref} defaultValue={clientInfo ? clientInfo.codigo : ''}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Región</label>
                            <Select options={regiones} styles={customStyleSelect} onChange={handleRegionChange} ref={clientRegion_ref}
                                placeholder={'Seleccione una región'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Comuna</label>
                            <Select options={comunas} styles={customStyleSelect} noOptionsMessage={() => 'Sin resultados'}
                                placeholder={'Seleccione una comuna'} isSearchable={true} ref={clientComuna_ref} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ciudad</label>
                            <input type="text" className="form-control field"
                                ref={clientCity_ref}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control field"
                                ref={clientAddress_ref} defaultValue={clientInfo ? clientInfo.calle : ''}
                            />
                        </div>
                    </div>

                    <div ref={technician_info_ref}
                        className={'mb-3 ' + (user.role == 'TECNICO' ? '' : 'd-none')}>
                        <p className="lead mb-2">Información técnico</p>

                        <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" onChange={handleEsExterno} ref={techExtern_ref} />
                            <label className="form-check-label">Es externo</label>
                        </div>

                        <div className="mb-3 d-none" ref={techCompany_ref}>
                            <label className="form-label">Empresa</label>
                            <input type="text" className="form-control field" ref={techCompanyInput_ref} />
                        </div>
                    </div>

                    <div className="d-grid">
                        {isEnabled ? <button className="btn btn-outline-danger mb-2">Desactivar cuenta</button>
                        : <button className="btn btn-outline-success mb-2">Activar cuenta</button>}
                        <button type="submit" className="btn btn-primary">
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;