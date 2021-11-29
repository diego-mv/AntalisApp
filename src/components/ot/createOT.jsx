import { faBriefcase, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState , useEffect, Fragment, useRef} from "react";
import Layout from "../layout";
import Backend from "../backend";
import LoadingContent from "../layout/loading_content";
import ButtonBack from "../layout/ButtonBack";
import Select from "react-select";
import customStyleSelect from "../layout/utils/custom_style_select";
import CalendarTechnical from "./utils/CalendarTechnical";
import { Accordion } from "react-bootstrap";
import OverlayAlert from "../layout/utils/overlay_alert";
import moment from "moment";
import { TipoActividad } from "../../helpers/IdActividad";
import ModalClientAddress from "./utils/ModalClientAddress";

const CreateOT = ({match}) => {
    const [loading, setLoading] = useState(true);
    const [regiones, setRegiones] = useState([]);
    const [technicals, setTechnicals] = useState([]);
    const [dataSolicitud, setDataSolicitud] = useState({
        contrato: "",
        descripcion: "",
        emailCliente: "",
        equipId: "",
        fechaCreacion: "",
        fullnameCliente: "",
        id: "",
        idCliente: "",
        marca: "",
        modelo: "",
        phoneCliente: "",
        serie: "",
        vigenciaContrato: ""
    });

    useEffect(() => {
        Backend.get('/Accounts/getTecnicos', {})
        .then(res => {
            setTechnicals(res.data.data.map(tec => {
                if(tec.isEnabled){
                    return {
                        value: tec.id,
                        label: `${tec.fullname} (${tec.email}) (fono: ${tec.phone})`,
                        technical: tec.fullname
                    }
                }
            }));
            Backend.get('/OrdenTrabajo/getSolicitud', {
                params: { 
                    IdSolicitud: match.params.idrequest
                }
            })
            .then(res => {
                setDataSolicitud(res.data)
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
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);
    
    return loading ? <LoadingContent /> : <Layout content={<CreateOTContent technicals={technicals} dataSolicitud={dataSolicitud} regiones={regiones}/>} />;
}

const CreateOTContent = ({technicals, dataSolicitud, regiones}) => {
    const [showModal, setShowModal] = useState(false);
    const [comunas, setComunas] = useState([]);
    const [technicalAsiggned, setTechnicalAssigned] = useState("");
    const [alert, setAlert] = useState(null);
    
    const otRegion_ref = useRef();
    const otComuna_ref = useRef();
    const otCalle_ref = useRef();

    const updateAddress = (regionId, comunaId, calle) => {
        otCalle_ref.current.value = calle;
        otRegion_ref.current.selectOption( regiones.find( reg => {if(reg.value === regionId){return reg}}))
    }

    const handleTechnicalAssigned = (e) => {
        setTechnicalAssigned("");
        setTechnicalAssigned(e.value)
    }

    const handleRegionChange = (event) => {
        setComunas([]);
        otComuna_ref.current.clearValue();
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

    const SubmitCreateOT = (e) => {
        e.preventDefault();
        console.log("region", otRegion_ref.current.getValue()[0].value, otRegion_ref.current.getValue()[0].label)
        console.log("comuna", otComuna_ref.current.getValue()[0].value, otComuna_ref.current.getValue()[0].label)
        console.log(otCalle_ref.current.value);

        setAlert(
                <OverlayAlert
                    variant="success"
                    message="Orden de trabajo ingresada con éxito"
                    duration="3000"
                />
            );
    }

    return (
        <Fragment>
            <ButtonBack to="/otrequest/pending" />
            {alert}
            <div>
                <div className="card p-3 bg-white mx-auto" style={{minHeight: '20rem', minWidth: '20rem', maxWidth: "60rem"}}>
                    <div className="px-2">
                        <h4 className="mb-0 text-bold">
                            <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                            Generar orden de trabajo
                        </h4>
                    </div>
                    <hr className="my-3" />
                    <form className="row m-4" onSubmit={SubmitCreateOT}>
                        <div className="mb-3">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><span className="text-bold"><FontAwesomeIcon icon={faInfoCircle} className="me-2" /> Datos solicitud</span></Accordion.Header>
                                    <Accordion.Body>
                                        <div className="mb-2">
                                            <span className="text-bold">Cliente: </span> {dataSolicitud.fullnameCliente} (<a href={`mailto:${dataSolicitud.emailCliente}`}>{dataSolicitud.emailCliente}</a>)
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-bold">Teléfono: </span> {dataSolicitud.phoneCliente}
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-bold">Marca Equipo:</span> {dataSolicitud.marca}
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-bold">Modelo Equipo:</span> {dataSolicitud.modelo}
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-bold">Serie Equipo:</span> {dataSolicitud.serie}
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-bold">Fecha de ingreso solicitud: </span> {moment(dataSolicitud.fechaCreacion).format("DD-MM-yyyy HH:mm")}
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-bold">Descripción: </span><br/>
                                            {dataSolicitud.descripcion}
                                        </div>
                                        <a className="btn btn-primary" onClick={() => setShowModal(true)}>Ver direcciones del cliente</a>
                                        
                                        <ModalClientAddress show={showModal} onHide={() => setShowModal(false)} 
                                                            idClient={dataSolicitud.idCliente} 
                                                            updateAddress={updateAddress}/>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo de actividad</label>
                            <select className="form-select">
                                <option defaultValue>Seleccione el tipo de actividad...</option>
                                {
                                    TipoActividad.map( (act) => (
                                        <option value={act.value}>{act.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Técnico</label>
                            <Select options={technicals} styles={customStyleSelect} onChange={handleTechnicalAssigned}
                                placeholder={'Seleccione un tecnico para ver su agenda'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'}
                            />
                        </div>
                        <div className="mb-3">
                            {technicalAsiggned !== "" 
                                ? (
                                    <Fragment>
                                        <CalendarTechnical technicalId={technicalAsiggned}/>
                                        <small className="text-muted mx-auto">Esta ventana es solo para visualizar la agenda, seleccione el horario de visita en el campo de abajo </small>
                                    </Fragment>
                                )
                                : null}
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label className="form-label">Seleccione el día de la visita</label>
                            <input type="date" maxLength="50" className="form-control field"  />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                        <label className="form-label">Mañana/Tarde</label>
                            <select className="form-select">
                                <option defaultValue>Seleccione el horario...</option>
                                <option value="1">Mañana</option>
                                <option value="2">Tarde</option>
                            </select>
                        </div>

                        <p className="mt-2 text-bold">Dirección</p><hr/>
                        <div className="mb-3">
                            <label className="form-label">Región</label>
                            <Select options={regiones} styles={customStyleSelect} onChange={handleRegionChange}
                                placeholder={'Seleccione una región...'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'} ref={otRegion_ref}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Comuna</label>
                            <Select options={comunas} styles={customStyleSelect} noOptionsMessage={() => 'Sin resultados'} ref={otComuna_ref}
                                placeholder={'Seleccione una comuna'} isSearchable={true} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Calle</label>
                            <input type="text" maxLength="50" placeholder="ej: Calle 137" className="form-control field" ref={otCalle_ref}/>
                        </div>

                        <div className="d-grid gap-2 mb-3 mt-4">
                            <button className="btn btn-primary">Generar OT</button>
                        </div>
                    </form>
                </div>                
            </div>
        </Fragment>
    );
}

export default CreateOT;