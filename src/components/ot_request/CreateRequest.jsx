import { faArrowLeft, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../layout";
import LoadingContent from "../layout/loading_content";
import Backend from "../backend";
import Select from "react-select";
import customStyleSelect from "../layout/utils/custom_style_select";
import OverlayAlert from "../layout/utils/overlay_alert";
import ButtonBack from "../layout/ButtonBack";

const CreateRequest = () => {
    const [loading, setLoading] = useState(true);
    const [regiones, setRegiones] = useState([]);
    const [equipmentUser, setEquipmentUser] = useState([]);

    useEffect(() => {
        Backend.get('/OrdenTrabajo/GetMyEquipos', {})
            .then( equipment => {
                setEquipmentUser(equipment.data.data.map(e => {
                    return {
                        value: e.id,
                        label: "Marca: "+e.marca+" | Modelo: "+e.modelo+" | Serie: "+e.serie,
                    }
                }));
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        Backend.get('/Ubicacion/Regiones', {})
            .then(res => {
                setRegiones(res.data.map(region => {
                    return {
                        value: region.id,
                        label: region.name
                    }
                }));
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        
        setLoading(false);
    }, []);

    return loading ? <LoadingContent /> : <Layout content={<CreateRequestForm equipmentUser={equipmentUser} regiones={regiones}/>} />;
}

const CreateRequestForm = ({ equipmentUser , regiones}) => {
    const [comunas, setComunas] = useState([]);
    const [alert, setAlert] = useState(null);

    const description_ref = useRef();
    const equipmentId_ref = useRef();
    const region_ref = useRef();
    const comuna_ref = useRef();
    const calle_ref = useRef();

    const trimFields = () => {
        document.querySelectorAll('.field').forEach(elem => {
            elem.value = elem.value.trim();
        });
    }

    const handleRegionChange = (event) => {
        setComunas([]);
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

    const submitRequest = (event) => {
        event.preventDefault();
        trimFields();

        let alert_required = false;

        let equipment = equipmentId_ref.current.getValue();
        const equipment_control = equipmentId_ref.current.controlRef;
        if(equipment_control) { equipment_control.classList.remove('required-field'); }
        if(!equipment.length) {
            alert_required = true;
            if(equipment_control) { equipment_control.classList.add('required-field'); }
        } else {
            equipment = equipment[0].equipment;
        }

        let region = region_ref.current.getValue();
        const region_control = region_ref.current.controlRef;
        if(region_control) { region_control.classList.remove('required-field'); }
        if(!region.length) {
            alert_required = true;
            if(region_control) { region_control.classList.add('required-field'); }
        } else {
            region = region[0].region;
        }

        let comuna = comuna_ref.current.getValue();
        const comuna_control = comuna_ref.current.controlRef;
        if(comuna_control) { comuna_control.classList.remove('required-field'); }
        if(!comuna.length) {
            alert_required = true;
            if(comuna_control) { comuna_control.classList.add('required-field'); }
        } else {
            comuna = comuna[0].comuna;
        }

        const required_fields = [description_ref, calle_ref];
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
            descripcion: description_ref.current.value,
            equipoId: equipmentId_ref.current.getValue()[0].value,
            regionId: region_ref.current.getValue()[0].value,
            comunaId: comuna_ref.current.getValue()[0].value,
            calle: calle_ref.current.value
        })
        .then(res => {
            description_ref.current.value = ""
            calle_ref.current.value = ""
            comuna_ref.current.clearValue();

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
                <ButtonBack to="/home"/>
            </div>
            <div className="card p-4 bg-white mx-auto" style={{maxWidth: '60rem'}}>
                <div className="px-2">
                    <h4 className="mb-0 text-bold">
                        <FontAwesomeIcon icon={faFolderPlus} className="me-2" />
                        Crear solicitud
                    </h4>
                </div>

                <hr className="my-3" />

                <form onSubmit={submitRequest}>
                    <div className="mb-3">
                        <label className="form-label">Seleccione el equipo asociado a la solicitud</label>
                        <Select options={equipmentUser} styles={customStyleSelect}  ref={equipmentId_ref}
                            placeholder={'Seleccione...'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Región</label>
                        <Select options={regiones} styles={customStyleSelect} onChange={handleRegionChange}
                            placeholder={'Seleccione una región...'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'} ref={region_ref}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Comuna</label>
                        <Select options={comunas} styles={customStyleSelect}
                            placeholder={'Seleccione una región...'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'} ref={comuna_ref}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Calle</label>
                        <input type="text" name="userName" maxLength="50" className="form-control field" ref={calle_ref} placeholder="ej: Calle 001"/>
                    </div>
                    <div className="form-group mb-4">
                        <label className="mb-3" htmlFor="description">Descripción</label>
                        <textarea className="form-control" id="description" rows="6" ref={description_ref}></textarea>
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