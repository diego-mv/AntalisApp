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

    const userName_ref = useRef();
    const userEmail_ref = useRef();
    const userPhone_ref = useRef();
    const role_ref = useRef();

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

    const handleEsExterno = (event) => {
        if(event.target.checked) {
            techCompany_ref.current.classList.remove('d-none');
        } else {
            techCompany_ref.current.classList.add('d-none');
        }
    }

    const handleRegionChange = (event) => {
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

    const trimFields = () => {
        document.querySelectorAll('.field').forEach(elem => {
            elem.value = elem.value.trim();
        });
    }

    const submitUser = (event) => {
        event.preventDefault();
        trimFields();

        let alert_required = false;

        const required_fields = [userName_ref, userEmail_ref];
        required_fields.map(field => {
            field.current.classList.remove('required-field');
            if(!field.current.value) {
                alert_required = true;
                field.current.classList.add('required-field');
            }
        });


        let role = role_ref.current.getValue();
        const role_control = role_ref.current.controlRef;
        if(role_control) { role_control.classList.remove('required-field'); }
        if(!role.length) {
            alert_required = true;
            if(role_control) { role_control.classList.add('required-field'); }
        } else {
            role = role[0].role;
        }

        if(role == 'CLIENTE') {
            const client_required_fields = [clientCode_ref, clientCity_ref, clientAddress_ref];
            client_required_fields.map(field => {
                field.current.classList.remove('required-field');
                if(!field.current.value) {
                    alert_required = true;
                    field.current.classList.add('required-field');
                }
            });

            let region = clientRegion_ref.current.getValue();
            const clientRegion_control = clientRegion_ref.current.controlRef;
            if(clientRegion_control) { clientRegion_control.classList.remove('required-field'); }
            if(!region.length) {
                alert_required = true;
                if(clientRegion_control) { clientRegion_control.classList.add('required-field'); }
            }

            let comuna = clientComuna_ref.current.getValue();
            const clientComuna_control = clientComuna_ref.current.controlRef;
            if(clientComuna_control) { clientComuna_control.classList.remove('required-field'); }
            if(!comuna.length) {
                alert_required = true;
                if(clientComuna_control) { clientComuna_control.classList.add('required-field'); }
            }

        } else if(role == 'TECNICO') {
            techCompanyInput_ref.current.classList.remove('required-field');
            if(techExtern_ref.current.checked && !techCompanyInput_ref.current.value) {
                alert_required = true;
                techCompanyInput_ref.current.classList.add('required-field');
            }
        }

        if(alert_required) {
            setAlert(
                <OverlayAlert
                    variant="danger"
                    message="Debes llenar los campos requeridos"
                    duration="3000"
                />
            );
            return;
        }

        if(role == 'CLIENTE') {
            console.log(clientRegion_ref.current);
            Backend.post('/Accounts/RegisterCliente', {
                email: userEmail_ref.current.value,
                fullName: userName_ref.current.value,
                phone: userPhone_ref.current.value,
                codigo: clientCode_ref.current.value,
                region: clientRegion_ref.current.getValue()[0].value,
                comuna: clientComuna_ref.current.getValue()[0].value,
                ciudad: clientCity_ref.current.value,
                calle: clientAddress_ref.current.value
            })
            .then(res => {
                setAlert(<OverlayAlert
                    variant="success"
                    message="El usuario ha sido registrado exitosamente"
                    duration="3000"
                />);
            })
            .catch(err => {
                setAlert(<OverlayAlert
                    variant="danger"
                    message="Ocurrió un error al intentar registrar al usuario. Por favor intente nuevamente más tarde"
                    duration="3000"
                />);
            });
        } else if(role == 'TECNICO') {
            let externo = techExtern_ref.current.checked;
            Backend.post('/Accounts/RegisterTecnico', {
                email: userEmail_ref.current.value,
                fullName: userName_ref.current.value,
                username: userEmail_ref.current.value,
                phone: userPhone_ref.current.value,
                password: 'Antalis;123',
                esExterno: externo,
                empresa: externo ? techCompanyInput_ref.current.value : ''
            })
            .then(res => {
                setAlert(<OverlayAlert
                    variant="success"
                    message="El usuario ha sido registrado exitosamente"
                    duration="3000"
                />);
            })
            .catch(err => {
                setAlert(<OverlayAlert
                    variant="danger"
                    message="Ocurrió un error al intentar registrar al usuario. Por favor intente nuevamente más tarde"
                    duration="3000"
                />);
            });
        } else {
            Backend.post('/Accounts/RegisterUser', {
                email: userEmail_ref.current.value,
                fullName: userName_ref.current.value,
                username: userEmail_ref.current.value,
                phone: userPhone_ref.current.value,
                password: 'Antalis;123',
                rolId: role_ref.current.getValue()[0].value
            })
            .then(res => {
                setAlert(<OverlayAlert
                    variant="success"
                    message="El usuario ha sido registrado exitosamente"
                    duration="3000"
                />);
            })
            .catch(err => {
                setAlert(<OverlayAlert
                    variant="danger"
                    message="Ocurrió un error al intentar registrar al usuario. Por favor intente nuevamente más tarde"
                    duration="3000"
                />);
            });
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
                        <input type="text" name="userName" maxLength="50" className="form-control field" ref={userName_ref} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" name="userEmail" className="form-control field" ref={userEmail_ref} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="userPhone" maxLength="30" className="form-control field" ref={userPhone_ref} />
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
                            <input type="text" className="form-control field" ref={clientCode_ref} />
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
                            <input type="text" className="form-control field" ref={clientCity_ref} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control field" ref={clientAddress_ref} />
                        </div>
                    </div>

                    <div className="d-none mb-3" ref={technician_info_ref}>
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
                        <input type="submit" className="btn btn-primary" value="Confirmar" />
                    </div>
                </form>

            </div>
        </div>
    );
}

export default RegisterUser;