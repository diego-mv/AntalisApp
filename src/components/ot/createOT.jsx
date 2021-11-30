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
import OverlayAlert from "../layout/utils/overlay_alert";
import { TipoActividad } from "../../helpers/IdActividad";
import AccordionDataRequest from "./utils/accordionDataRequest";
import { requiredSelect } from "../../helpers/requiredSelect";
import moment from "moment";

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
    const horarios = [
        {
            label: "Mañana", 
            value: "AM",
        },
        {
            label: "Tarde", 
            value: "PM",
        }
    ]    

    const actividad_ref = useRef();
    const tecnico_ref = useRef();
    const diaVisita_ref = useRef();
    const horario_ref = useRef();
    const tiempoSLA_ref = useRef();

    const handleTechnicalAssigned = (e) => {
        setTechnicalAssigned("");
        setTechnicalAssigned(e.value)
    }

    const SubmitCreateOT = (e) => {
        e.preventDefault();
        console.log(actividad_ref.current.value)
        let alert_required = false;

        requiredSelect(tecnico_ref, alert_required);
        requiredSelect(actividad_ref, alert_required);
        requiredSelect(horario_ref, alert_required);

        const required_fields = [diaVisita_ref];
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
        if(isNaN(tiempoSLA_ref.current.value)){
            setAlert(
                <OverlayAlert
                    variant="danger"
                    message="Tiempo SLA debe ser numérico"
                    duration="3000"
                />
            );
            return;
        }

        Backend.post('/OrdenTrabajo/createOT', {
            solicitudId: dataSolicitud.id,
            tecnicoId: tecnico_ref.current.getValue()[0].value,
            tipoActividadId: actividad_ref.current.getValue()[0].value,
            fechaVisita: diaVisita_ref.current.value,
            horario: horario_ref.current.getValue()[0].value,
            tiempo: tiempoSLA_ref.current.value
        })
        .then(res => {
            setAlert(
                <OverlayAlert
                    variant="success"
                    message="Orden de trabajo ingresada con éxito"
                    duration="3000"
                />
            );            
        })
        .catch(err => {
            setAlert(<OverlayAlert
                variant="danger"
                message="Ocurrió un error al ingresar la OT. Por favor intente nuevamente más tarde"
                duration="3000"
            />);
        });

        
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
                            <AccordionDataRequest fullnameCliente={dataSolicitud.fullnameCliente} 
                                                  emailCliente={dataSolicitud.emailCliente}
                                                  phoneCliente={dataSolicitud.phoneCliente}
                                                  marca={dataSolicitud.marca}
                                                  modelo={dataSolicitud.modelo}
                                                  serie={dataSolicitud.serie}
                                                  fechaCreacion={dataSolicitud.fechaCreacion}
                                                  descripcion={dataSolicitud.descripcion}
                                                  region={dataSolicitud.region}
                                                  comuna={dataSolicitud.comuna}
                                                  calle={dataSolicitud.calle}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo de actividad</label>
                            <Select options={TipoActividad} styles={customStyleSelect} ref={actividad_ref}
                                    placeholder={'Seleccione un horario...'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'}
                                />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Técnico</label>
                            <Select options={technicals} styles={customStyleSelect} onChange={handleTechnicalAssigned} ref={tecnico_ref}
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
                            <input type="date" maxLength="50" className="form-control field"  ref={diaVisita_ref}/>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                        <label className="form-label">Mañana/Tarde</label>
                            <Select options={horarios} styles={customStyleSelect} ref={horario_ref}
                                    placeholder={'Seleccione un horario...'} isSearchable={true} noOptionsMessage={() => 'Sin resultados'}
                                />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiempo SLA</label>
                            <input type="number" name="userName" maxLength="50" className="form-control field" ref={tiempoSLA_ref} />
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