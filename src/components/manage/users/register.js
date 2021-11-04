import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout";
import LoadingContent from "../../layout/loading_content";
import Backend from "../../backend";

const RegisterUser = () => {
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getRoles', {})
        .then(_roles => {
            setRoles(_roles);
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

    const handleRoleChange = (event) => {
        let role = event.target[event.target.selectedIndex].getAttribute('role');
        switch(role) {
            case 'CLIENTE':
                client_info_ref.current.classList.remove('d-none');
                technician_info_ref.current.classList.add('d-none');
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

    return (
        <div className="card p-4 bg-white mx-auto" style={{width: '24rem'}}>
            <div className="px-2">
                <h4 className="mb-0">
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Registrar usuario
                </h4>
            </div>

            <hr className="my-3" />

            <form>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select className="form-select" onChange={handleRoleChange}>
                        <option value="">Seleccione un rol</option>
                        {roles.data.map((role, index) => {
                            return (
                                <option key={index} value={role.id} role={role.normalizedName}>
                                    {role.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="d-none mb-3" ref={client_info_ref}>
                    <p className="lead">Información cliente</p>
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
    );
}

export default RegisterUser;