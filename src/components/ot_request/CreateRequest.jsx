import { faArrowLeft, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../layout";
import LoadingContent from "../layout/loading_content";
import Backend from "../backend";
import Select from "react-select";
import customStyleSelect from "../layout/utils/custom_style_select";
import OverlayAlert from "../layout/utils/overlay_alert";

const CreateRequest = () => {
    const [loading, setLoading] = useState(true);
    const [equipmentUser, setEquipmentUser] = useState([]);

    const getCurrentUserId = () => {
        return new Promise(resolve => {
            try {
                const user = JSON.parse(localStorage.getItem('current_user'));
                resolve(user.id);
            } catch(e) {
                resolve(null);
            }
        });
    }

    useEffect(() => {
        const idCliente = getCurrentUserId().then(id => {
            if(id) return id;
        });

        Backend.get('/OrdenTrabajo/GetEquipos', {
            params: {
                IdCliente: "562f604a-10aa-4473-9b64-f02fff0967e2"
            }
        })
        .then( equipment => {
            setEquipmentUser(equipment.data.data.map(e => {
                return {
                    value: e.id,
                    label: "Marca: "+e.marca+" | Modelo: "+e.modelo+" | Serie: "+e.serie,
                }
            }));
            console.log(equipmentUser)
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return loading ? <LoadingContent /> : <Layout content={<CreateRequestForm equipmentUser={equipmentUser} />} />;
}

const CreateRequestForm = ({ equipmentUser }) => {
    const description_ref = useRef();
    const equipmentId_ref = useRef();

    const [alert, setAlert] = useState(null);

    const trimFields = () => {
        document.querySelectorAll('.field').forEach(elem => {
            elem.value = elem.value.trim();
        });
    }

    const submitEquipment = (event) => {
        event.preventDefault();
        trimFields();

        
        let alert_required = false;

        let role = equipmentId_ref.current.getValue();
        const role_control = equipmentId_ref.current.controlRef;
        if(role_control) { role_control.classList.remove('required-field'); }
        if(!role.length) {
            alert_required = true;
            if(role_control) { role_control.classList.add('required-field'); }
        } else {
            role = role[0].role;
        }

        const required_fields = [description_ref];
        required_fields.map(field => {
            field.current.classList.remove('required-field');
            if(!field.current.value) {
                alert_required = true;
                field.current.classList.add('required-field');
            }
        });

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

        Backend.post('/OrdenTrabajo/CreateSolicitud', {
            descripcion: description_ref,
            equipoId: equipmentId_ref.current.getValue()[0].value
        })
        .then(res => {
            setAlert(<OverlayAlert
                variant="success"
                message="La solicitud ha sido ingresada con éxito."
                duration="3000"
            />);
        })
        .catch(err => {
            setAlert(<OverlayAlert
                variant="danger"
                message="Ocurrió un error al intentar ingresar la solicitud. Por favor intente nuevamente más tarde"
                duration="3000"
            />);
        });
    }

    return (
        <div>
            {alert}
            <div className="my-2">
                <a className="link-primary" href="/layout">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Volver atrás
                </a>
            </div>
            <div className="card p-4 bg-white mx-auto" style={{maxWidth: '60rem',minHeight: '30rem'}}>
                <div className="px-2">
                    <h4 className="mb-0">
                        <FontAwesomeIcon icon={faFolderPlus} className="me-2" />
                        Crear solicitud
                    </h4>
                </div>

                <hr className="my-3" />

                <form onSubmit={submitEquipment}>
                    <div className="mb-3">
                        <label className="form-label">Seleccione el equipo asociado a la solicitud</label>
                        <Select options={equipmentUser} styles={customStyleSelect}  ref={equipmentId_ref} required
                            placeholder={'Seleccione...'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="description">Descripción</label>
                        <textarea className="form-control" id="description" rows="3" ref={description_ref} required></textarea>
                    </div>                    
                    <div className="d-grid">
                        <input type="submit" className="btn btn-primary" value="Confirmar" />
                    </div>
                </form>

            </div>
        </div>
    );
}

export default CreateRequest;